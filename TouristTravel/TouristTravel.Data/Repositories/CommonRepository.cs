using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using TouristTravel.Data.Interfaces;

namespace TouristTravel.Data.Repositories
{
	public class CommonRepository<T> : IRepository<T> where T : class
	{
		protected readonly IContext Db;

		public CommonRepository(IContext context)
		{
			Db = context;
		}

		public virtual IEnumerable<T> Find(Func<T, bool> predicate)
		{
			return Db.Set<T>().Where(predicate).ToList();
		}

		public virtual T FirstOrDefault(Func<T, bool> predicate)
		{
			return Db.Set<T>().FirstOrDefault(predicate);
		}

		public virtual void Save()
		{
			Db.SaveChanges();
		}

		public virtual IEnumerable<T> GetAll()
		{
			return Db.Set<T>().ToList();
		}

		public virtual T GetById(int id)
		{
			return Db.Set<T>().Find(id);
		}

		public virtual void Create(T item)
		{
			Db.Set<T>().Add(item);
			Save();
		}

		public virtual void Update(T item)
		{
			Db.Set<T>().AddOrUpdate(item);
			Save();
		}

		public virtual void Delete(int id)
		{
			var item = Db.Set<T>().Find(id);
			if (item != null)
			{
				Db.Set<T>().Remove(item);
			}
			Save();
		}
	}
}