using Employe_Backend.DataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Employe_Backend.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly DbSet<T> _dbSet;
        private readonly EmployeDataContext _context;

        public GenericRepository(EmployeDataContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<T> Add(T entity)
        {
             _dbSet.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(T entity)  
        {
             _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }

       public async Task<IEnumerable<T>> GetAll(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet;

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync();
        }        

        public async Task<T> GetOne(int id)
        {
            
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> GetData(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet;

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(predicate);
        }
        public async Task Update(T entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

        }
    }
}
