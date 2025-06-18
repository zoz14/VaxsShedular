using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class dtoNewUser
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string ConfirmedPassword { get; set; }

        public string? PhoneNumber { get; set; }
   
       
        public string? Nationalid { get; set;}
        
    }
}
