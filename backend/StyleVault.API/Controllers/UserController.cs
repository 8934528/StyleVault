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
        
        return Ok(new { userId = user.UserId, username = user.Username, coins = user.Coins });
    }
}
