using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Employe_Backend.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll(params Expression<Func<T, object>>[] includes);
       // Task<IEnumerable<T>> GetAll();

       Task<T> GetData(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);
        Task<T> GetOne(int id);

        Task<T> Add(T entity);
        Task Update(T entity);
        Task Delete(T entity);
    }
}
