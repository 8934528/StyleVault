using Microsoft.EntityFrameworkCore;
using StyleVault.Domain.Entities;
using StyleVault.Application.Interfaces;

namespace StyleVault.Infrastructure.Data;

public class AppDbContext : DbContext, IAppDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Card> Cards { get; set; }
    public DbSet<Pack> Packs { get; set; }
    public DbSet<PackCard> PackCards { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User
        modelBuilder.Entity<User>()
            .HasKey(u => u.UserId);

        // Card
        modelBuilder.Entity<Card>()
            .HasKey(c => c.CardId);
        
        modelBuilder.Entity<Card>()
            .HasIndex(c => c.CardNumber)
            .IsUnique();

        // Pack
        modelBuilder.Entity<Pack>()
            .HasKey(p => p.PackId);
        
        modelBuilder.Entity<Pack>()
            .HasOne(p => p.User)
            .WithMany(u => u.Packs)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // PackCard
        modelBuilder.Entity<PackCard>()
            .HasKey(pc => pc.PackCardId);
        
        modelBuilder.Entity<PackCard>()
            .HasOne(pc => pc.Pack)
            .WithMany(p => p.PackCards)
            .HasForeignKey(pc => pc.PackId)
            .OnDelete(DeleteBehavior.Cascade);
            
        modelBuilder.Entity<PackCard>()
            .HasOne(pc => pc.Card)
            .WithMany(c => c.PackCards)
            .HasForeignKey(pc => pc.CardId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
