using System;

namespace TouristTravel.Services.Services
{
    public class Filters
    {
        public int AccountId { get; set; }

        public int CountryId { get; set; }

        public DateTime ADate { get; set; }

        public DateTime DDate { get; set; }

        public int Adult { get; set; }

        public int Children { get; set; }

        public int MinPrice { get; set; }

        public int MaxPrice { get; set; }
    }
}