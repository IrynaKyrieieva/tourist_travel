using System.Web.Http;
using TouristTravel.Services.Interfaces;

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
		public IHttpActionResult StrResult(string user)
		{
			var name= _accountService.SignUp(user);

			return Ok(name);
		}
	}
}
