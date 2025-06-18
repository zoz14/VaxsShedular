namespace CenterApi.Data.Model
{
    public class CenterVaccine
    {
        public int CenterId { get; set; }
        public Center Center { get; set; }


        public int VaccineId { get; set; }
        public Vaccine Vaccine { get; set; }
    }
}
