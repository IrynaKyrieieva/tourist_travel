using System;
using System.Web.Http;
using TouristTravel.Services.Interfaces;
using TouristTravel.Services.Models;

namespace TouristTravel.WebApi.Controllers
{
	public class AccountController : ApiController
    {
		private readonly IAccountService _accountService;

		public AccountController(IAccountService accountService)
		{
			_accountService = accountService;
		}

		[HttpPost]
		[AllowAnonymous]
		public IHttpActionResult SignUp(AccountSignUpDto account)
		{
			var isSignUp = _accountService.SignUp(account);

			return Ok(isSignUp);
		}

		[HttpGet]
		[AllowAnonymous]
		public IHttpActionResult SignIn(string email, string password, DateTime signInDateTime)
		{
			var account = _accountService.SignIn(email, password, signInDateTime);

			return Ok(account);
		}
	}
}
