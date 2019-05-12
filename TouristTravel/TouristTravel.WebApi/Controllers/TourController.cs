using System.Web.Http;
using TouristTravel.Services.Interfaces;

namespace TouristTravel.WebApi.Controllers
{
    public class TourController : ApiController
    {
        private readonly ITourService _tourService;

        public TourController(ITourService tourService)
        {
            _tourService = tourService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetCountries()
        {
            var countries = new string[]{ "Ukraine", "Russia", "Slovenia", "Slovakia" };

            return Ok(countries);
        }

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetTourById(int tourId)
        {
            var tour = _tourService.GetTourById(tourId);

            return Ok(tour);
        }

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetWishList(int accountId)
        {
            var tours = _tourService.GetWishList(accountId);

            return Ok(tours);
        }
    }
}
