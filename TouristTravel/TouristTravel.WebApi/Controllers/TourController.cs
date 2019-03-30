using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TouristTravel.WebApi.Controllers
{
    public class TourController : ApiController
    {

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetCountries()
        {
            var countries = new string[]{ "Ukraine", "Russia", "Slovenia", "Slovakia" };

            return Ok(countries);
        }
    }
}
