using Reserve_final.Data.Model;
using System.ComponentModel.DataAnnotations;

namespace Reserve_final.Data.Model
{
    public class Vaccine
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }

        public string Precautions { get; set; }


        public string TimeGap { get; set; }

        public List<CenterVaccine>? CenterVaccines { get; set; }

        public List<Reservation>? Reservations { get; set; }

    }
}
