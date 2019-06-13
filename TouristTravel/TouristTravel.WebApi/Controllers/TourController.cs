using System;
using System.Web.Http;
using TouristTravel.Services.Interfaces;
using TouristTravel.Services.Services;

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
        public IHttpActionResult GetTours(int accountId)
        {
            var tours = _tourService.GetTours(accountId);
            return Ok(tours);
        }

        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult GetToursByFilter(Filters filters)
        {
            var tours = _tourService.GetTours(filters);
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
        public IHttpActionResult DeleteFromFavorite(int accountId, int tourId)
        {
            _tourService.DeleteTourToWishList(accountId, tourId);
            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetMaxPrice()
        {
            return Ok(_tourService.GetMaxPrice());
        }

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult BuyTour(int tourScheduleId, int accountId, DateTime date)
        {
            var isBuying = _tourService.BuyingTour(accountId, tourScheduleId, date);

            return Ok(isBuying);
        }

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetPurchasedTours(int accountId)
        {
            var tours = _tourService.GetPurchasedTours(accountId);

            return Ok(tours);
        }
    }
}
