using Microsoft.Extensions.DependencyInjection;
using StyleVault.Application.Interfaces;
using StyleVault.Application.Services;

namespace StyleVault.API.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<RewardService>();
        services.AddSingleton<ProbabilityEngine>();
        services.AddScoped<IPackService, PackService>();
        return services;
    }
}
