using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TouristTravel.Services.Interfaces;

namespace TouristTravel.WebApi.Controllers
{
    public class CountryController : ApiController
    {
        private ICountryService _countryService;

        public CountryController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetCountries()
        {
            var countries = _countryService.GetCountries();
            return Ok(countries);
        }
    }
}
