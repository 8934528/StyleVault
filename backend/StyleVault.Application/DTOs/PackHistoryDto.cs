using System;
using System.Collections.Generic;

namespace StyleVault.Application.DTOs;

public class PackHistoryDto
{
    public Guid PackId { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal Cost { get; set; }
    public decimal TotalWon { get; set; }
    public List<CardDto> Cards { get; set; } = new();
}
