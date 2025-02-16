using Microsoft.EntityFrameworkCore;

namespace e_commerce_api.Models
{
    public class ContextDb : DbContext
    {
        public ContextDb(DbContextOptions<ContextDb> options) : base(options) { }

        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("(localdb)\\MSSQLLocalDB;Database=SchoolDB;Trusted_Connection=True;");
        }*/

        public DbSet<Weapon> Weapons { get; set; }
        public DbSet<Skin> Skins { get; set; }
    }
}
