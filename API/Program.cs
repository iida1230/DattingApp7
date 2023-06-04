using System.Text;
using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Middleware;
using API.Services;
using API.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationSevices(builder.Configuration);
builder.Services.AddIdentityService(builder.Configuration);


var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// if (builder.Environment.IsDevelopment()){
//   app.UseDeveloperExceptionPage();
// }


// Configure the HTTP request pipeline.
app.UseCors(builder =>  
    builder.AllowAnyHeader().
    AllowAnyMethod().
    AllowCredentials().
    WithOrigins("https://localhost:4200"));

// app.UseHttpsRedirection();

// app.UseAuthorization();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<PresenceHub>("hubs/presence");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    var logger = services.GetService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
