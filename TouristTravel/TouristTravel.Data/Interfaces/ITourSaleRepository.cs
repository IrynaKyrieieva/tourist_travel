using System;
using System.Collections.Generic;
using TouristTravel.Data.Entities;

namespace TouristTravel.Data.Interfaces
{
    public interface ITourSaleRepository : IRepository<TourSale>
    {
        List<Tour> GetPurchasedTours(int accountId);

        void TourPurchase(int accountId, int tourScheduleId, DateTime date);
    }
}