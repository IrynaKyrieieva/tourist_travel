using System.Web.Http;
using Microsoft.AspNetCore.Cors;
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
		public IHttpActionResult SignUp(AccountDto account)
		{
			var isSignUp = _accountService.SignUp(account);

			return Ok(isSignUp);
		}

		[HttpGet]
		[AllowAnonymous]
		public IHttpActionResult Test()
		{
			var test = _accountService.Test();

			return Ok(test);
		}
	}
}
