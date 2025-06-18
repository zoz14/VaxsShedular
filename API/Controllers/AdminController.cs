using API.Data;
using API.Data.Model;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   [Authorize(Roles ="Admin")]
    public class AdminController : ControllerBase
    {

        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _db;

        public AdminController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, AppDbContext db)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _db = db;
        }



        [HttpPost("Accept")]
        public async Task<IActionResult> Accept( dtoAccept model)
        {
            AppUser? user = await _userManager.FindByNameAsync(model.userName);
            if (user == null)
            {
                return NotFound($"User {model.userName} Not Found");
            }
            else
            {
                user.EmailConfirmed = true;
                await _userManager.UpdateAsync(user);
           
            }
            return Ok($"User {model.userName} Submit successfully");
        }



        
        //////// /////////////////////////////////////////////////
  



        [HttpPost("Reject")]
        public async Task<IActionResult> Reject( dtoAccept model)
        {
            AppUser? user = await _userManager.FindByNameAsync(model.userName);
            if (user == null)
            {
                return NotFound($"user {model.userName}Not Found");
            }
            else
            {
                user.EmailConfirmed = false; 
                await _userManager.DeleteAsync(user);
            }
            return Ok($"User {model.userName} Deleted successfully");
        }

       
        /// /////////////////////////////////////////////////////////////////////
        
        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUserBy()
        {
            var users = _userManager.Users.Where(u => !u.EmailConfirmed).Select(u => u.UserName);
            return Ok(users);
        }




        ///////////////////////////////////////////////////////////////





        [HttpPost("AddRoles")]
        public async Task<IActionResult> CreateRole([FromBody] dtoAddRole model)
        {
            var roleExists = await _roleManager.RoleExistsAsync(model.name);
            if (!roleExists)
            {
                var role = new IdentityRole(model.name);
                var result = await _roleManager.CreateAsync(role);
                if (result.Succeeded)
                {
                    return Ok($"Role '{model.name}' created successfully");
                }
                return BadRequest(result.Errors);
            }
            return BadRequest($"Role '{model.name}' already exists");
        }

        
        /// ///////////////////////////////////////////////////////////////////
     

        [HttpPost("AddUserRole")]
        public async Task<IActionResult> AddUserRole([FromBody] dtoAddRoleToUser model)
        {
            var user = await _userManager.FindByNameAsync(model.userName);
            if (user == null)
            {
                return NotFound($"User with ID '{model.userName}' not found");
            }

            var roleExists = await _roleManager.RoleExistsAsync(model.RoleName);
            if (!roleExists)
            {
                return NotFound($"Role '{model.RoleName}' not found");
            }

            var result = await _userManager.AddToRoleAsync(user, model.RoleName);
            if (result.Succeeded)
            {
                return Ok($"User '{user.UserName}' added to role '{model.RoleName}' successfully");
            }
            return BadRequest(result.Errors);
        }




    }


}











