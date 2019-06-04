using System.Collections.Generic;
using TouristTravel.Data.Entities;

namespace TouristTravel.Data.Interfaces
{
    public interface ITourScheduleRepository : IRepository<TourSchedule>
    {
        List<TourSchedule> GetAllSchedules();

        TourSchedule GetFullInfoById(int id);
    }
}