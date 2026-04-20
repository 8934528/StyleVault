using StyleVault.Application.DTOs;

namespace StyleVault.Application.Interfaces;

public interface IPackService
{
    Task<PackResultDto> OpenPackAsync(Guid userId);
}
