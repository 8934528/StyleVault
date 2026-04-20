namespace StyleVault.Application.DTOs;

public class UserDto
{
    public Guid UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public decimal Coins { get; set; }
}

public class RegisterUserDto
{
    public string Username { get; set; } = string.Empty;
}
