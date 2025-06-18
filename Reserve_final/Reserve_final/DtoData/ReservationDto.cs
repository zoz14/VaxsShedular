using Reserve_final.Data.Model;

namespace Reserve_final.DtoData
{
    public class ReservationDto
    {
        public string UserName { get; set; }
        public int Age { get; set; }
        public int DoseNumber { get; set; }
        public DateTime DateTime { get; set; }
        public int CenterId { get; set; }
        public int VaccineId { get; set; }
        public int GapTime { get; set; }
        public DateTime? PreviousVaccinationDate { get; set; }
        public bool Confirmation {  get; set; }
    }
}
