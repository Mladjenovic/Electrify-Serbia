using Domain.Database;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class AuthContext : IdentityDbContext
    {
        public AuthContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<UserAuthModel> UserAuthModels { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseSqlServer(@"Server=(local)\\SQLEXPRESS;Database=ElectrifySerbia_AuthDB;Trusted_Connection=True;");
        //    }
        //}
    }
}
