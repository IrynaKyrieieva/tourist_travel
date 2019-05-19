using System.Web.Http;
using TouristTravel.Services.Interfaces;

namespace TouristTravel.WebApi.Controllers
{
    public class TourController : ApiController
    {
        private readonly ITourService _tourService;
        private readonly ICountryService _countryService;

        public TourController(ITourService tourService, ICountryService countryService)
        {
            _tourService = tourService;
            _countryService = countryService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetCountries()
        {
            var countries = _countryService.GetCountries();
            return Ok(countries);
        }

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetTours()
        {
            var tours = _tourService.GetTours();
            return Ok(tours);
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

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult AddToFavorites(int accountId, int tourId)
        {
            _tourService.AddTourToWishList(accountId, tourId);
            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult DeleteFromFavourite(int accountId, int tourId)
        {
            _tourService.DeleteTourToWishList(accountId, tourId);
            return Ok();
        }
    }
}
