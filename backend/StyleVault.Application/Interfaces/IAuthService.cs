using StyleVault.Application.DTOs;

namespace StyleVault.Application.Interfaces;

public interface IAuthService
{
    Task<UserDto> RegisterAsync(RegisterUserDto dto);
    Task<UserDto?> GetUserAsync(Guid userId);
}
