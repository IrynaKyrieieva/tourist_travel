using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TouristTravel.Data.Entities
{
    public class TourSchedule
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TourId { get; set; }

        [Required]
        public DateTime DateIn { get; set; }

        [Required]
        public DateTime DateOut { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public int AdultCount { get; set; }

        [Required]
        public int ChildrenCount { get; set; }


        public Tour Tour { get; set; }
        public ICollection<FavoriteTourToUser> FavoriteTourToUsers { get; set; }
        public ICollection<TourSale> TourSales { get; set; }
    }
}