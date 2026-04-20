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
    public async Task<ActionResult<UserDto>> Register([FromBody] RegisterUserDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        return Ok(result);
    }

    [HttpGet("me/{userId}")]
    public async Task<ActionResult<UserDto>> GetMe(Guid userId)
    {
        var user = await _authService.GetUserAsync(userId);
        if (user == null) return NotFound("User not found");
        return Ok(user);
    }
}
