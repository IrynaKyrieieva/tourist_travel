using System;
using System.ComponentModel.DataAnnotations;

namespace TouristTravel.Data.Entities
{
    public class FavoriteTourToUser
    {
        [Key]
        public int Id { get; set; }

        public int AccountId { get; set; }

        public int TourScheduleId { get; set; }

        public DateTime Date { get; set; }


        public Account Account { get; set; }

        public TourSchedule TourSchedule { get; set; }
    }
}