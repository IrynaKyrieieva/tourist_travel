using System;
using System.ComponentModel.DataAnnotations;

namespace TouristTravel.Data.Entities
{
    public class TourSale
    {
        [Key]
        public int TourSaleId { get; set; }

        public int TourScheduleId { get; set; }

        public int AccountId { get; set; }

        public DateTime BuyingTime { get; set; }


        public TourSchedule TourSchedule { get; set; }
        public Account Account { get; set; }
    }
}