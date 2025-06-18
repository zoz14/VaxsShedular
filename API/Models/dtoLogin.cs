using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class dtoLogin
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        
        
    }
}
