using CenterApi.Data.Model;
using CenterApi.DtoData;

namespace CeneterApi.Data.Repository
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

       
    }

}

