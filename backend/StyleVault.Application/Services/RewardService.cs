namespace StyleVault.Application.Services;

public class RewardService
{
    // Keep this simple right now, this could be extended to handle daily rewards
    public decimal CalculateRewardBonus(decimal totalPackValue)
    {
        if (totalPackValue == 0) return 2.0m;
        
        return 0m;
    }
}
