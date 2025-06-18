using CeneterApi.Data.Repository;
using CeneterApi.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CenterApi.Data.Model;
using CenterApi.Data;
using CenterApi.DtoData;

namespace CeneterApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VaccineController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IDataRepository<Center> _centerRepository;
        private readonly IDataRepository<CenterVaccine> _centervaccineRepository;
        private readonly IDataRepository<Vaccine> _vaccineRepository;

        public VaccineController(IDataRepository<Center> centerRepository, IDataRepository<CenterVaccine> centervaccineRepository, IDataRepository<Vaccine> vaccineRepository, AppDbContext db)
        {
            _centerRepository = centerRepository;
            _centervaccineRepository = centervaccineRepository;
            _vaccineRepository = vaccineRepository;
            _db = db;
        }


        [HttpPost("addvaccine")]
        public async Task<IActionResult> CreateVaccine(VaccineDto vaccineDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var vaccine = new Vaccine
            {

                Name = vaccineDto.Name,
                Precautions = vaccineDto.Precautions,
                TimeGap = vaccineDto.TimeGap,
            };
            await _vaccineRepository.AddAsync(vaccine);
            await _vaccineRepository.Save();
            return Ok("Vaccine Added succesfully");
        }


        /// ////////////////////////////////////////////////////////////
        [HttpPost("addvaccinetocenter")]
        public async Task<IActionResult> AddVaccineToCenter(CenterVaccineDto model)
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



        /////////////////////////////////////////////


        [HttpGet("getallvaccine")]
        public async Task<IActionResult> GetAllVaccine()
        {
            var query = from vaccine in _db.Vaccine
                        select new
                        {
                            Id = vaccine.Id,
                            Name = vaccine.Name,
                            Precautions = vaccine.Precautions,
                            TimeGap = vaccine.TimeGap,
                            centers = vaccine.CenterVaccines.Select(sc => sc.Center.Name).ToList()
                        };

            var result = query.ToList();
            return Ok(result);
        }

        /// <summary>
        /// ////////////////////////////////////////////////////////////////////

        [HttpPut("updatevaccine/{id}")]
        public async Task<IActionResult> UpdateVaccine(int id, VaccineDto vaccineDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Retrieve the existing vaccine from the repository
            var vaccine = await _vaccineRepository.GetByIdAsync(id);
            if (vaccine == null)
            {
                return NotFound("Vaccine not found");
            }

            // Update the properties of the existing vaccine
            vaccine.Name = vaccineDto.Name;
            vaccine.Precautions = vaccineDto.Precautions;
            vaccine.TimeGap = vaccineDto.TimeGap;

            // Save the changes
            await _vaccineRepository.UpdateAsync(vaccine);
            await _vaccineRepository.Save();

            return Ok("Vaccine updated successfully");
        }




        /////////////////////////////////////////////////////////////////


        [HttpDelete("deletevaccine")]
        public async Task<IActionResult> DeleteVaccine(int id)
        {
            if (id == null)
            {
                return BadRequest("");
            }
            var vaccine = await _vaccineRepository.GetByIdAsync(id);
            if (vaccine == null)
            {
                return NotFound();
            }
            await _vaccineRepository.DeleteAsync(vaccine);
            await _vaccineRepository.Save();
            return Ok("Deleted");

        }
        ////////////////////////////////////////////////////////////////////////











    }
}
