using System;
using System.Collections.Generic;

namespace TouristTravel.Services.Models
{
    public class TourDto
    {
        public int Id { get; set; }

        public int TourId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsFavorite { get; set; }

        public string DefaultImageUrl { get; set; }

        public string Country { get; set; }

        public DateTime DateIn { get; set; }

        public DateTime DateOut { get; set; }

        public double Price { get; set; }

        public int AdultCount { get; set; }

        public int ChildrenCount { get; set; }

        public List<string> Photos { get; set; }
    }
}