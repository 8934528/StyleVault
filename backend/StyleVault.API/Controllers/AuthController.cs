using Microsoft.AspNetCore.Mvc;
using StyleVault.Application.DTOs;
using StyleVault.Application.Interfaces;

namespace StyleVault.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<object>> Register([FromBody] RegisterUserDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        var token = $"mock_token_{result.UserId}";
        return Ok(new { User = result, Token = token });
    }

    [HttpGet("me/{userId}")]
    public async Task<ActionResult<object>> GetMe(Guid userId)
    {
        var user = await _authService.GetUserAsync(userId);
        if (user == null) return NotFound("User not found");
        var token = $"mock_token_{user.UserId}";
        return Ok(new { User = user, Token = token });
    }
}
