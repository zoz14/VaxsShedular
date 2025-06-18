using Reserve_final.Data.Repository;
using Reserve_final.Data.Model;
using Reserve_final.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reserve_final.Data.Model;
using Reserve_final.DtoData;    
using Reserve_final.DtoData;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using System.Security.AccessControl;

namespace Reserve_final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IDataRepository<Center> _centerRepository;
        private readonly IDataRepository<CenterVaccine> _centervaccineRepository;
        private readonly IDataRepository<Vaccine> _vaccineRepository;
        private readonly IDataRepository<Reservation> _reservationRepository;
        public ReservationController(IDataRepository<Center> centerRepository, IDataRepository<CenterVaccine> centervaccineRepository, IDataRepository<Vaccine> vaccineRepository, IDataRepository<Reservation> reservationRepository, AppDbContext db)
        {
            _centerRepository = centerRepository;
            _centervaccineRepository = centervaccineRepository;
            _vaccineRepository = vaccineRepository;
            _reservationRepository = reservationRepository;
            _db = db;
        }


        




        [HttpPost("addbook")]
        public async Task<IActionResult> CreateBook(ReservationDto reservationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(reservationDto.Age< 18)
            {
                return BadRequest(new { success = false, message = "Age Must Be 18." });
            }


            if (string.IsNullOrEmpty(reservationDto.UserName))
            {
                return BadRequest(new { success = false, message = "Please fill in all required fields (Name )." });
            }

            // Check for existing reservation (optional, adjust logic as needed)
            var existingDose = await _reservationRepository.ExistsAsync(dose =>
                dose.UserName == reservationDto.UserName &&
                dose.DoseNumber == reservationDto.DoseNumber 
                );

            if (existingDose)
            {
                return BadRequest(new { success = false, message = "Patient has already reserved this dose." });
            }

            // Check dose order (optional, adjust logic as needed)
            if (reservationDto.DoseNumber == 2)
            {
                var firstDose = await _reservationRepository.ExistsAsync(dose =>
                    dose.UserName == reservationDto.UserName &&
                    dose.DoseNumber == 1 &&
                    dose.Confirmation == true);

                if (!firstDose)
                {
                    return BadRequest(new { success = false, message = "Patient must reserve the first dose before the second." });
                }

                var daysSinceFirstDose = (reservationDto.DateTime - reservationDto.PreviousVaccinationDate);
                var requiredTimeBetweenDoses = TimeSpan.FromDays(reservationDto.GapTime); // Replace with the actual required time between doses

                if (daysSinceFirstDose < requiredTimeBetweenDoses)
                {
                    return BadRequest($"It is too early to receive the second dose. Please wait at least {requiredTimeBetweenDoses.TotalDays} days after the first dose.");
                }
            }


                // Retrieve the Vaccine entity from the database based on the provided VaccineId
                var vaccine = await _vaccineRepository.GetByIdAsync(reservationDto.VaccineId);
                if (vaccine == null)
                {
                    return BadRequest("Invalid VaccineId");
                }

                // Retrieve the Center entity from the database based on the provided CenterId
                var center = await _centerRepository.GetByIdAsync(reservationDto.CenterId);
                if (center == null)
                {
                    return BadRequest("Invalid CenterId");
                }



            // Create a new Book instance with validated data (optional)

            var book = new Reservation
            {
                UserName = reservationDto.UserName,
                Age = reservationDto.Age,
                DateTime = reservationDto.DateTime,
                DoseNumber = reservationDto.DoseNumber,
                vaccine = vaccine, // Assign the retrieved Vaccine entity
                center = center,   // Assign the retrieved Center entity
                Confirmation =false,
                };

                await _reservationRepository.AddAsync(book);
                await _reservationRepository.Save();

                return Ok();
               
            
            

        }

        //***********************************************************************************************

        [HttpPost("Accept")]
        public async Task<IActionResult> Accept(dtoAccept model)
        {
            Reservation? user = await _reservationRepository.GetByIdAsync(model.Id);
            if (user == null)
            {
                return NotFound($"User {model.Id} Not Found");
            }
            else
            {
                user.Confirmation = true;
                await _reservationRepository.UpdateAsync(user);
                await _db.SaveChangesAsync();

            }
            return Ok($"User {model.Id} Submit successfully");
        }

        //*******************************************************************
        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUserBy()
        {
            var users = _db.Reservations.Where(u => !u.Confirmation).Select(u => u.UserName);
            return Ok(users);
        }
        //***********************************************************************
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVaccine(int id, ReservationDto reservationDto)
        {




            var update = await _db.Reservations.FindAsync(id);
            if (update == null)
            {
                return NotFound();

            }


            update.UserName = reservationDto.UserName;
            update.Age = reservationDto.Age;
            update.DateTime = reservationDto.DateTime;
            update.PreviousVaccinationDate = reservationDto.PreviousVaccinationDate;

            await _reservationRepository.UpdateAsync(update);

            await _db.SaveChangesAsync();
            return Ok(update);


        }
        //*********************************************************************************




        [HttpGet("GetVacc/{idvacc}")]

        public async Task<IActionResult> GetVacc(int idvacc)
        {
            var center = await _db.Reservations.Where(c => c.center.Id == idvacc)
                                  .Select(c => new
                                  {
                                      Id = c.Id,
                                      UserName = c.UserName,
                                      Age = c.Age,
                                      DoseNumber = c.DoseNumber,
                                      DateTime = c.DateTime,
                                      CenterName = c.center.Name, // Name of the center associated with the reservation
                                      VaccineName = c.vaccine.Name,
                                      Confirmation = c.Confirmation,
                                  })
                                  .ToListAsync();

            return Ok(center);

        }







        //**************************************************************************************
        [HttpDelete("book{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                var book = await _reservationRepository.GetByIdAsync(id);
                if (book == null)
                {
                    return NotFound();
                }

                await _reservationRepository.DeleteAsync(book);
                await _reservationRepository.Save();

                return Ok("Deleted");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        //****************************************************************************************

        [HttpGet("GetCertification/{idCert}")]
        public async Task<IActionResult> GetCertification(string idCert)
        {
            var desiredDoseNumber = 2; // Dose number to filter by

            try
            {
                var center = await _db.Reservations
                    .Where(c => c.UserName == idCert && c.DoseNumber == desiredDoseNumber)
                    .Select(c => new
                    {
                        UserName = c.UserName,
                        CenterName = c.center.Name, // Name of the center associated with the reservation
                        VaccineName = c.vaccine.Name
                    })
                    .ToListAsync();

                if (center == null || !center.Any())
                {
                    return NotFound("No certification even reserve second dose And your ID is correct .");
                }

                return Ok(center);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes

                return StatusCode(500, "Internal Server Error"); // Consider returning a more specific error code if possible
            }
        }







    }
}




