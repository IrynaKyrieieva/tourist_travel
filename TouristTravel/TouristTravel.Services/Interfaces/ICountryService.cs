using System.Collections.Generic;
using TouristTravel.Services.Models;

namespace TouristTravel.Services.Interfaces
{
    public interface ICountryService
    {
        List<CountryDto> GetCountries();
    }
}