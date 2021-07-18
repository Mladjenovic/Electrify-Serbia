using Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Domain.Database
{
    public class EfContext : DbContext
    {
        public EfContext(DbContextOptions<EfContext> options) : base(options)
        {

        }

        public DbSet<Crew> Crews { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Element> Elements { get; set; }
        public DbSet<Call> Calls { get; set; }
        public DbSet<Incident> Incidents { get; set; }
        public DbSet<SafetyDocument> SafetyDocuments { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        // Needed sets for settings: << needs controller implementation >>
        public DbSet<Street> Streets { get; set; }
        public DbSet<Icon> Icons { get; set; }
        public DbSet<OptionalFieldsVisibility> OptionalFieldsVisibilities { get; set; }
        public DbSet<WorkPlan> WorkPlan { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(@"Server=localhost;Database=ElectrifySerbiaDB;Trusted_Connection=True;");
        //}
    }
}
