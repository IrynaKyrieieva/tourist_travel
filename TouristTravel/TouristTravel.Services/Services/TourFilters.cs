using System;

namespace TouristTravel.Services.Services
{
    public class TourFilters
    {
        public int CountryId { get; set; }

        public DateTime ArrivalDate { get; set; }

        public DateTime DepartureDate { get; set; }

        public int AdultCount { get; set; }

        public int ChildrenCount { get; set; }

        public int StartPrice { get; set; }

        public int EndPrice { get; set; }
    }
}