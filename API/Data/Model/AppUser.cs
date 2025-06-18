using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
namespace API.Data.Model

{
    public class AppUser: IdentityUser

    {
        [Required]
        public string NationalId { get; set; }
    }
}
