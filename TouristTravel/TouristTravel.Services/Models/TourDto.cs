using System;

namespace TouristTravel.Services.Models
{
    public class TourDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsFavorite { get; set; }

        public string ImageUrl { get; set; }

        public string Country { get; set; }

        public DateTime DateIn { get; set; }

        public DateTime DateOut { get; set; }

        public double Price { get; set; }

        public int AdultCount { get; set; }

        public int ChildrenCount { get; set; }
    }
}