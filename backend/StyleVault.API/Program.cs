using Microsoft.EntityFrameworkCore;
using StyleVault.Application.Interfaces;
using StyleVault.Application.Services;
using StyleVault.Infrastructure.Data;
using StyleVault.API.Extensions;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// .env variables
Env.Load();

// database
var dbProvider = Environment.GetEnvironmentVariable("DB_PROVIDER") ?? "PostgreSQL";

// Configure
builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (dbProvider.Equals("SQLite", StringComparison.OrdinalIgnoreCase))
    {
        var sqliteConnection = Environment.GetEnvironmentVariable("SQLITE_CONNECTION") ?? "Data Source=stylevault.db";
        options.UseSqlite(sqliteConnection);
    }
    else
    {
        var host = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost";
        var port = Environment.GetEnvironmentVariable("DB_PORT") ?? "5432";
        var dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "stylevault";
        var username = Environment.GetEnvironmentVariable("DB_USER") ?? "postgres";
        var password = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "";
        
        var connectionString = $"Host={host};Port={port};Database={dbName};Username={username};Password={password}";
        options.UseNpgsql(connectionString);
    }
});

builder.Services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());

// application services
builder.Services.AddApplicationServices();

// controllers and Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Ensure database is created and seeded
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await DbInitializer.InitializeAsync(context);
}

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
