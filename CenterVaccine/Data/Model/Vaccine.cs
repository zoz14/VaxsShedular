
using System.ComponentModel.DataAnnotations;

namespace CenterApi.Data.Model
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

        

    }
}
