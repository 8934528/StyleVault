using Microsoft.EntityFrameworkCore;
using StyleVault.Application.DTOs;
using StyleVault.Application.Interfaces;
using StyleVault.Domain.Entities;

namespace StyleVault.Application.Services;

public class AuthService : IAuthService
{
    private readonly IAppDbContext _context;

    public AuthService(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<UserDto> RegisterAsync(RegisterUserDto dto)
    {
        var user = new User
        {
            Username = dto.Username,
            Coins = 100m // Starting balance
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new UserDto
        {
            UserId = user.UserId,
            Username = user.Username,
            Coins = user.Coins
        };
    }

    public async Task<UserDto?> GetUserAsync(Guid userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
        if (user == null) return null;

        return new UserDto
        {
            UserId = user.UserId,
            Username = user.Username,
            Coins = user.Coins
        };
    }
}
