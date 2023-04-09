using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions options) :base(options)
        {
            Console.WriteLine("-------------------options------------------");
            Console.WriteLine(options.ToString());
        }

        public DbSet<AppUser> User {get; set;}
    }
}