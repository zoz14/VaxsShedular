using CeneterApi.Data;
using CeneterApi.Data.Repository;
using CenterApi.Data.Model;
using CenterApi.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CenterApi.DtoData;
using Microsoft.AspNetCore.Authorization;

namespace CeneterApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class CenterController : ControllerBase
    {

        private readonly AppDbContext _db;
        private readonly IDataRepository<Center> _centerRepository;
        private readonly IDataRepository<CenterVaccine> _centervaccineRepository;
        private readonly IDataRepository<Vaccine> _vaccineRepository;

        public CenterController(IDataRepository<Center> centerRepository, IDataRepository<CenterVaccine> centervaccineRepository, IDataRepository<Vaccine> vaccineRepository, AppDbContext db)
        {
            _centerRepository = centerRepository;
            _centervaccineRepository = centervaccineRepository;
            _vaccineRepository = vaccineRepository;
            _db = db;
        }


        [HttpPost("addcenter")]
        public async Task<IActionResult> CreateCenter( CenterDto centerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var center = new Center
            {

                Name = centerDto.Name,
                
                Address = centerDto.Address,
                Contact = centerDto.Contact,
                

            };
            await _centerRepository.AddAsync(center);
            await _centerRepository.Save();
            return Ok();
        }


        /// ////////////////////////////////////////////

        [HttpPost("addvaccinetocenter")]
        public async Task<IActionResult> AddVaccineToCenter( CenterVaccineDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var center = await _centerRepository.GetByIdAsync(model.CenterId);
            if (center == null)
            {
                return NotFound("Center not found");
            }

            var vaccine = await _vaccineRepository.GetByIdAsync(model.VaccineId);
            if (vaccine == null)
            {
                return NotFound("Vaccine not found");
            }

            var centervaccine = new CenterVaccine
            {
                CenterId = model.CenterId,
                VaccineId = model.VaccineId,
            };

            await _centervaccineRepository.AddAsync(centervaccine);
            await _centervaccineRepository.Save();

            return Ok("Vaccine added to center successfully");
        }

        /// ///////////////////////////////////////////////////////////

        [HttpGet("getallcenter")]
        public async Task<IActionResult> GetAllCenter()
        {
            var query = from center in _db.Center
                        select new
                        {
                            Id = center.Id,
                            Name = center.Name,
                            Contact = center.Contact,
                            Address = center.Address,
                            Vaccines = center.CenterVaccines.Select(sc => sc.Vaccine.Name).ToList()
                        };

            var result = query.ToList();
            return Ok(result);
        }
        /////////////////////////////////////////////////////////////////

        [HttpGet("getcenter/{id}")]
        public async Task<IActionResult> GetCenterById(int id)
        {
            var center = await _db.Center
                                  .Where(c => c.Id == id)
                                  .Select(c => new
                                  {
                                      
                                      Name = c.Name,
                                      Contact = c.Contact,
                                      Address = c.Address,
                                      Vaccines = c.CenterVaccines.Select(cv => new
                                      {
                                          Name = cv.Vaccine.Name,
                                     
                                      }).ToList()
                                  })
                                  .FirstOrDefaultAsync();

            if (center == null)
            {
                return NotFound("Center not found");
            }

            return Ok(center);
        }

        /// ////////////////////////////////////////////////////////

        [HttpDelete("deletecenter{id}")]
        public async Task<IActionResult> DeleteCenter(string id)
        {
            if (!int.TryParse(id, out int centerId))
            {
                return BadRequest("Invalid center ID format");
            }

            var center = await _centerRepository.GetByIdAsync(centerId);
            if (center == null)
            {
                return NotFound();
            }

            await _centerRepository.DeleteAsync(center);
            await _centerRepository.Save();

            return Ok("Deleted");
        }



        ///////////////////////////////////////////////////////////
        [HttpDelete("removevaccinefromcenter/{centerId}/{vaccineId}")]
        public async Task<IActionResult> RemoveVaccineFromCenter(int centerId, int vaccineId)
        {
            // Retrieve the center from the database
            var center = await _db.Center.FindAsync(centerId);
            if (center == null)
            {
                return NotFound("Center not found");
            }

            // Retrieve the vaccine from the database
            var vaccine = await _db.Vaccine.FindAsync(vaccineId);
            if (vaccine == null)
            {
                return NotFound("Vaccine not found");
            }

            // Check if the center has the specified vaccine
            var centerVaccine = await _db.CenterVaccines.FirstOrDefaultAsync(cv => cv.CenterId == centerId && cv.VaccineId == vaccineId);
            if (centerVaccine == null)
            {
                return NotFound("Vaccine is not associated with the center");
            }

            // Remove the center-vaccine association
            _db.CenterVaccines.Remove(centerVaccine);
            await _db.SaveChangesAsync();

            return Ok("Vaccine removed from center successfully");
        }


        /// ////////////////////////////////////////////////////////////////////


        [HttpPut("updatecenter/{id}")]
        public async Task<IActionResult> UpdateCenter(int id,  CenterDto centerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Retrieve the existing center from the repository
            var center = await _centerRepository.GetByIdAsync(id);

            if (center == null)
            {
                return NotFound(); // Center not found
            }

            // Update the properties of the existing center
            center.Name = centerDto.Name;
    
            center.Address = centerDto.Address;
            center.Contact = centerDto.Contact;

            // Save the changes
            await _centerRepository.UpdateAsync(center);
            await _centerRepository.Save();

            return Ok();
        }




    }
}
