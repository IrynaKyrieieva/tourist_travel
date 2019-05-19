using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Repositories;
using TouristTravel.Services.Interfaces;
using TouristTravel.Services.Models;

namespace TouristTravel.Services.Services
{
    public class CountryService : ICountryService
    {
        private readonly CommonRepository<Country> _countryRepository;

        public CountryService(CommonRepository<Country> countryRepository)
        {
            _countryRepository = countryRepository;
        }

        public List<CountryDto> GetCountries()
        {
            var countries = Mapper.Map<IEnumerable<Country>, IEnumerable<CountryDto>>(_countryRepository.GetAll());

            return countries.ToList();
        }
    }
}