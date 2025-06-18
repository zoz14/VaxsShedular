using Reserve_final.Data.Model;
using Reserve_final.DtoData;
using System.Linq.Expressions;

namespace Reserve_final.Data.Repository
{
    public interface IDataRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
  
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<bool> Save();

        Task<List<Center>> GetAllCentersAsync();
        Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);
    }

}

