using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;

namespace TouristTravel.Data.Repositories
{
    public class TourScheduleRepository : CommonRepository<TourSchedule>, ITourScheduleRepository
    {
        public TourScheduleRepository(IContext context) : base(context)
        {
        }

        public List<TourSchedule> GetAllSchedules()
        {
            return Db.Schedules
                     .Include(x => x.Tour)
                     .Include(x => x.Tour.Country).ToList();
        }

        public TourSchedule GetFullInfoById(int id)
        {
            return Db.Schedules.Where(x => x.Id == id)
                     .Include(x => x.Tour)
                     .Include(x => x.Tour.TourPhotos)
                     .Include(x => x.Tour.Country).FirstOrDefault();
        }
    }
}