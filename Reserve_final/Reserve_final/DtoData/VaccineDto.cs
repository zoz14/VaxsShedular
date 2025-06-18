using System.ComponentModel.DataAnnotations;

namespace Reserve_final.DtoData
{
    public class VaccineDto
    {
       
 
        public string? Name { get; set; }

        public string Precautions { get; set; }


        public string TimeGap { get; set; }
    }
}
