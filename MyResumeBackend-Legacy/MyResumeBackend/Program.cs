using Microsoft.OpenApi.Models;
using MyResumeBackend.Services;
using MyResumeBackend.Services.UnitOfWork;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IProjectService, ProjectService>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();

/* Swagger for API Testing */
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyResume API", Version = "v1" });
});

var corsOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();

if (corsOrigins == null || corsOrigins.Length == 0)
{
    var singleOrigin = builder.Configuration["Cors:AllowedOrigins"];
    corsOrigins = !string.IsNullOrEmpty(singleOrigin)
        ? new[] { singleOrigin }
        : Array.Empty<string>();
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        if (corsOrigins.Length > 0)
        {
            policy.WithOrigins(corsOrigins)
                  .AllowCredentials()
                  .WithMethods("GET")
                  .AllowAnyMethod();
        }
        else
        {
            policy.AllowAnyOrigin()
                  .WithMethods("GET")
                  .AllowAnyMethod();
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();

app.MapControllers();

app.Run();
