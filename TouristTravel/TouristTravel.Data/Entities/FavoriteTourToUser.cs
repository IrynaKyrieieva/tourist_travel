using System.ComponentModel.DataAnnotations;

namespace TouristTravel.Data.Entities
{
    public class FavoriteTourToUser
    {
        [Key]
        public int Id { get; set; }

        public int AccountId { get; set; }

        public int TourId { get; set; }

        public Account Account { get; set; }

        public Tour Tour { get; set; }
    }
}