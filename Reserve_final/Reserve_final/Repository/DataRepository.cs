﻿using Reserve_final.Data.Repository;
using Reserve_final.Data.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq.Expressions;

namespace Reserve_final.Data.Repository
{
    public class DataRepository<T> : IDataRepository<T> where T : class
    {
        private readonly AppDbContext _db;
        private readonly DbSet<T> table;

        public DataRepository(AppDbContext db)
        {
            _db = db;
            table = _db.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await table.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await table.FindAsync(id);
        }

        public async Task AddAsync(T entity)
        {
            await table.AddAsync(entity);
        }

        public async Task UpdateAsync(T entity)
        {
            _db.Entry(entity).State = EntityState.Modified;
        }

        public async Task DeleteAsync(T entity)
        {
            table.Remove(entity);
        }

        public async Task<bool> Save()
        {
            return await _db.SaveChangesAsync() > 0;
        }


        public async Task<List<Center>> GetAllCentersAsync()
        {
            return await _db.Center.ToListAsync();
        }

        public async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate)
        {
            return await table.AnyAsync(predicate);
        }

    }
}
