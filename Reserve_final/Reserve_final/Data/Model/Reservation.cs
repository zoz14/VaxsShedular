using Reserve_final.Data.Model;
using System.ComponentModel.DataAnnotations;

namespace Reserve_final.Data.Model
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Range(18, int.MaxValue)] // Ensure age is 18 or older
        public int Age { get; set; }
        public int DoseNumber { get; set; }
        public  Center center { get; set; }
        public Vaccine vaccine { get; set; }   
        public DateTime DateTime { get; set; } = DateTime.Now;
        public DateTime? PreviousVaccinationDate { get; set; }
        public bool Confirmation {  get; set; }
    }
}
