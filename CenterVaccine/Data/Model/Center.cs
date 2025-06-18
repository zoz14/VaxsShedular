
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CenterApi.Data.Model
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


    }
}
