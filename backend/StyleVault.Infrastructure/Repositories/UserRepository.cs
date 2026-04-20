// Placeholder for UserRepository to satisfy empty file architecture requirements.
using Microsoft.EntityFrameworkCore;
using StyleVault.Domain.Entities;
using StyleVault.Infrastructure.Data;

namespace StyleVault.Infrastructure.Repositories;

public class UserRepository
{
    private readonly AppDbContext _context;
    
    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByIdAsync(Guid id) => await _context.Users.FindAsync(id);
}
