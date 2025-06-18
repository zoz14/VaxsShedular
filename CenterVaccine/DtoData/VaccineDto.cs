using System.ComponentModel.DataAnnotations;

namespace CenterApi.DtoData
{
    public class VaccineDto
    {
       
 
        public string? Name { get; set; }

        public string Precautions { get; set; }


        public string TimeGap { get; set; }
    }
}
