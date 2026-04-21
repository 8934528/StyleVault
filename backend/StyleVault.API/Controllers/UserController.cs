using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StyleVault.Infrastructure.Data;

namespace StyleVault.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{userId}/balance")]
    public async Task<IActionResult> GetBalance(Guid userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return NotFound(new { message = "User not found" });

        return Ok(new { coins = user.Coins });
    }
    
    // helper
    [HttpGet("default")]
    public async Task<IActionResult> GetDefaultUser()
    {
        var user = await _context.Users.FirstOrDefaultAsync();
        if (user == null) return NotFound(new { message = "No users exist in DB" });
        
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] string username)
    {
        if (string.IsNullOrWhiteSpace(username))
            return BadRequest(new { message = "Username is required" });

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
        if (user == null)
        {
            user = new StyleVault.Domain.Entities.User
            {
                UserId = Guid.NewGuid(),
                Username = username,
                Coins = 100 // Starting balance
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        return Ok(new { userId = user.UserId, username = user.Username, coins = user.Coins });
    }
}
