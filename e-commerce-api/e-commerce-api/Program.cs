using e_commerce_api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Stripe;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

if (args.Length > 0 && args[0].ToLower() == "seed")
{
    await Seeder.WeaponDbInitializer();
    return;
}

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200", "http://localhost:4200/cart")
            .WithHeaders(HeaderNames.ContentType, "x-custom-header");
        });
});

// Add services to the container.

builder.Services.AddControllers();

//inject context
builder.Services.AddDbContext<ContextDb>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DBConection")));

StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];
builder.Services.Configure<StripeSettings>(builder.Configuration.GetSection("Stripe"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
