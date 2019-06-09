using System.ComponentModel.DataAnnotations;

namespace TouristTravel.Data.Entities
{
    public class TourPhoto
    {
        [Key]
        public int Id { get; set; }

        public int TourId { get; set; }

        public string Url { get; set; }

        public Tour Tour { get; set; }
    }
}