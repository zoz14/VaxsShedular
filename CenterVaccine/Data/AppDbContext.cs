using Microsoft.EntityFrameworkCore;
using CenterApi.Data.Model;


namespace CenterApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CenterVaccine>().HasKey(cv => new
            {
                cv.CenterId,
                cv.VaccineId,
            });

            modelBuilder.Entity<CenterVaccine>().HasOne(c => c.Center).WithMany(cv => cv.CenterVaccines).HasForeignKey(cv => cv.CenterId);
            modelBuilder.Entity<CenterVaccine>().HasOne(v => v.Vaccine).WithMany(cv => cv.CenterVaccines).HasForeignKey(v => v.VaccineId);

            base.OnModelCreating(modelBuilder);

        }


        public DbSet<Center> Center { get; set; }
        public DbSet<Vaccine> Vaccine { get; set; }
        public DbSet<CenterVaccine> CenterVaccines { get; set; }
       
    }
}