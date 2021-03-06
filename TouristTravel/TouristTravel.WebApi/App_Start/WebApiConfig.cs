﻿using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace TouristTravel.WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
			config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{action}",
                defaults: new { id = RouteParameter.Optional }
            );

			var cors = new EnableCorsAttribute("*", "*", "*");
			config.EnableCors(cors);

			var formatter = GlobalConfiguration.Configuration.Formatters;
			formatter.Remove(formatter.XmlFormatter);
			var settings = formatter.JsonFormatter.SerializerSettings;
			settings.Formatting = Formatting.Indented;
			settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
		}
    }
}
