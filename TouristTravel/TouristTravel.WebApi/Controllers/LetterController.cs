
using System;
using System.Web.Http;
using TouristTravel.Services.Interfaces;

namespace TouristTravel.WebApi.Controllers
{
	public class LetterController : ApiController
	{
		private readonly ILetterService _letterService;

		public LetterController(ILetterService letterService)
		{
			_letterService = letterService;
		}

		[HttpGet]
		[AllowAnonymous]
		public IHttpActionResult Subscribe(string email, DateTime dateOfSubscribe)
		{
			var isSubscribe = _letterService.SubscribeOfNewsletter(email, dateOfSubscribe);

			return Ok(isSubscribe);
		}
	}
}
