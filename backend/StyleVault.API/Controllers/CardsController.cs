using Microsoft.AspNetCore.Mvc;
using StyleVault.Application.DTOs;
using StyleVault.Application.Interfaces;

namespace StyleVault.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CardsController(ICardService cardService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CardInfoDto>>> GetAll()
    {
        var cards = await cardService.GetAllCardsAsync();
        return Ok(cards);
    }
}
