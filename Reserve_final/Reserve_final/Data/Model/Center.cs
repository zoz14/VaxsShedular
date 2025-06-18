using Reserve_final.Data.Model;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Reserve_final.Data.Model
{
    public class Center
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
       
      
        public string Contact { get; set; }

        public string Address { get; set; }

        public List<CenterVaccine>? CenterVaccines { get; set; }

        public List<Reservation> reservations { get; set; }
     


    }
}
