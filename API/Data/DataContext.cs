using Microsoft.EntityFrameworkCore;
using API.Entity;
namespace API.Data;
public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Cart> Carts => Set<Cart>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Iphone 12", Description = "This is a Iphone 12", Price = 25000, ImageUrl = "1.jpg", Stock = 10, IsActive = true, },
            new Product { Id = 2, Name = "Iphone 13", Description = "This is a Iphone 13", Price = 35000, ImageUrl = "1.jpg", Stock = 10, IsActive = true, },
            new Product { Id = 3, Name = "Iphone 14", Description = "This is a Iphone 14", Price = 40000, ImageUrl = "1.jpg", Stock = 10, IsActive = true, }
        );
    }
}