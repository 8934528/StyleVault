using StyleVault.Application.DTOs;

namespace StyleVault.Application.Interfaces;

public interface ICardService
{
    Task<IEnumerable<CardInfoDto>> GetAllCardsAsync();
    Task<IEnumerable<CardInfoDto>> GetCardsByRarityAsync(int rarityLevel);
}
