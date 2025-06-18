using API.Data;
using API.Data.Model;
using API.Models;
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {


        public AccountController(UserManager<AppUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            this.configuration = configuration;
        }

        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration configuration;


        [HttpPost("register")]
        public async Task<IActionResult> Register(dtoNewUser model)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(model.Email);
                if (existingUser != null)
                {
                    // Email already exists, return a bad request response
                    return BadRequest("Email already exists");
                }

                if (model.Password != model.ConfirmedPassword)
                {
                    // Passwords do not match, return a bad request response
                    return BadRequest("Passwords do not match");
                }

                var user = new AppUser
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    NationalId = model.Nationalid
                    
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {

                    await _userManager.AddToRoleAsync(user, "patient");

                    return Ok("User registered successfully");
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }





  [HttpPost("Login")]
public async Task<IActionResult> LogIn(dtoLogin login)
{
    if (ModelState.IsValid)
    {
        AppUser? user = await _userManager.FindByEmailAsync(login.Email); 
        if (user != null)
        {
            if (await _userManager.IsEmailConfirmedAsync(user))
                    {
                        if (await _userManager.CheckPasswordAsync(user, login.Password))
                        {
                            var claims = new List<Claim>();
                            //claims.Add(new Claim("name", "value"));
                            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
                            claims.Add(new Claim(ClaimTypes.Name, user.Email));
                            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
                            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
                            var roles = await _userManager.GetRolesAsync(user);
                            foreach (var role in roles)
                            {
                                claims.Add(new Claim(ClaimTypes.Role, role.ToString()));
                            }
                            //signingCredentials
                            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:SecretKey"]));
                            var sc = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                            var token = new JwtSecurityToken(
                                claims: claims,
                                issuer: configuration["JWT:Issuer"],
                                audience: configuration["JWT:Audience"],
                                expires: DateTime.Now.AddMonths(1),
                                signingCredentials: sc
                                );
                            var result = new
                            {
                                token = new JwtSecurityTokenHandler().WriteToken(token),
                                role = string.Join(", ", roles),
                                confirmation = await _userManager.IsEmailConfirmedAsync(user),

                                // expiration = token.ValidTo,
                            };
                           
                                

                            return Ok(result);
                        }
                        return BadRequest("Check Your password");
                        
            }
            else
            {
                return Unauthorized("Your Account Not Accrpted");
            }
        }
        else
        {
            ModelState.AddModelError("", "Email is invalid");
        }
    }
    return BadRequest(ModelState);
}





        [HttpGet("ConfirmationStatus")]
        public async Task<IActionResult> Check(string email)
        {
          

            var user = await _userManager.FindByEmailAsync(email); // Changed to find by email
           

            var Confirmation = await _userManager.IsEmailConfirmedAsync(user);

            return Ok(new { confirmation = Confirmation });
        }




    }



}





