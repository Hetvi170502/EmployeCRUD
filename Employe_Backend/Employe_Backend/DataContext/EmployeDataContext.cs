using Employe_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Employe_Backend.DataContext
{
    public class EmployeDataContext : DbContext
    {
        public EmployeDataContext(DbContextOptions options) : base(options) 
        {

        }

        public DbSet<Employe> Employe { get; set; }
        public DbSet<Hobby> Hobby { get; set; }
        public DbSet<Designation> Designation { get; set; }
        public DbSet<EmployeHobby> employeHobbies { get; set; }
    }
}
