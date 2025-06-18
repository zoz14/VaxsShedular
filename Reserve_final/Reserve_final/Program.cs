using Reserve_final.Data.Repository;
using Reserve_final.Data.Model;
using Reserve_final.Data.Model;
using Reserve_final.Data.Repository;
using Reserve_final.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("MyConnection")
    ));

builder.Services.AddScoped<IDataRepository<Center>, DataRepository<Center>>();
builder.Services.AddScoped<IDataRepository<Vaccine>, DataRepository<Vaccine>>();
builder.Services.AddScoped<IDataRepository<CenterVaccine>, DataRepository<CenterVaccine>>();
builder.Services.AddScoped<IDataRepository<Reservation>, DataRepository<Reservation>>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder
            .WithOrigins("http://localhost:3000") // Allow requests from this origin
            .AllowAnyHeader()
            .AllowAnyMethod();
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
app.UseRouting();
app.UseCors("AllowSpecificOrigin");
app.UseAuthorization();
app.MapControllers();

app.Run();