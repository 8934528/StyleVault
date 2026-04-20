using Microsoft.EntityFrameworkCore;
using StyleVault.Application.Interfaces;
using StyleVault.Application.Services;
using StyleVault.Infrastructure.Data;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Load .env variables
Env.Load();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure PostgreSQL Database using Env Vars
var connectionString = $"Host={Env.GetString("DB_HOST", "localhost")};Port={Env.GetString("DB_PORT", "5432")};Database={Env.GetString("DB_NAME", "stylevault")};Username={Env.GetString("DB_USER", "postgres")};Password={Env.GetString("DB_PASSWORD", "8934528")}";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Dependency Injection
builder.Services.AddSingleton<ProbabilityEngine>();
builder.Services.AddScoped<IPackService, PackService>();

// CORS Setup (allow Vite frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000") // Vite default ports
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Seed Database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // Automatically apply migrations and seed
    context.Database.EnsureCreated();
    DbSeeder.SeedCards(context);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
