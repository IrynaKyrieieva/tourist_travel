using System.Web.Http;
using TouristTravel.Services.Helper;

namespace TouristTravel.WebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
			AutoMapperConfig.Initialize();
			GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
