using Microsoft.AspNetCore.Mvc;
using StyleVault.Application.DTOs;
using StyleVault.Application.Interfaces;

namespace StyleVault.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PackController : ControllerBase
{
    private readonly IPackService _packService;

    public PackController(IPackService packService)
    {
        _packService = packService;
    }

    [HttpPost("open")]
    public async Task<ActionResult<PackResultDto>> OpenPack([FromQuery] Guid userId)
    {
        try
        {
            var result = await _packService.OpenPackAsync(userId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
