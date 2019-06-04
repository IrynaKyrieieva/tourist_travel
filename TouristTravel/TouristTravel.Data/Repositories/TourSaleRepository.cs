using System;
using System.Collections.Generic;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;

namespace TouristTravel.Data.Repositories
{
    public class TourSaleRepository : CommonRepository<TourSale>, ITourSaleRepository
    {
        public TourSaleRepository(IContext context) : base(context)
        {
        }

        public List<Tour> GetPurchasedTours(int accountId)
        {
            throw new NotImplementedException();
        }

        public void TourPurchase(int accountId, int tourScheduleId, DateTime date)
        {
            Create(new TourSale()
            {
                //AccountId = accountId,
                BuyingTime = date,
                TourScheduleId = tourScheduleId
            });
        }
    }
}