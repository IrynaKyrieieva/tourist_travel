using System;
using System.Collections.Generic;

namespace TouristTravel.Data.Interfaces
{
	public interface IRepository<T> where T : class
	{
		IEnumerable<T> GetAll();

		T GetById(int id);

		void Create(T item);

		void Update(T item);

		void Delete(int id);

		IEnumerable<T> Find(Func<T, bool> predicate);

		T FirstOrDefault(Func<T, bool> predicate);

		void Save();
	}
}