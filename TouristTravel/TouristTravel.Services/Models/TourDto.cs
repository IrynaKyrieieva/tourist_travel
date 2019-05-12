namespace TouristTravel.Services.Models
{
    public class TourDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsFavorite { get; set; }

        public string ImageUrl { get; set; }
    }
}