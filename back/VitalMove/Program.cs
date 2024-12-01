using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VitalMoveDTO;
using Util.Login;
using Services.Alimentacao;
using Services.AtFisica;
using Services.IMC;

var builder = WebApplication.CreateBuilder(args);

// Configuração dos serviços
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Endereço do front-end
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configuração dos middlewares
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigins");

// Rotas
app.MapPost("/login", (UserLoginDTO credentials) =>
{
    bool isValid = Login.Authenticate(credentials);
    if(isValid){
       LoginResponseDTO LoginResponse = new  LoginResponseDTO();
       LoginResponse.Token = "1";
       return Results.Ok(LoginResponse);

    }

    return Results.BadRequest("Invalid username or password");

}).WithName("Login");

app.MapPost("/register", (UserRegisterDTO credentials) =>
{
    bool isValid = Login.Register(credentials);
    return isValid ? Results.Ok("Usuário registrado com sucesso!") : Results.BadRequest("Usuário já existente");
}).WithName("Register");

app.MapPost("/PostAlimentacao", (AlimentacaoResponseDTO dto) =>
{
    bool isValid = Alimentacao.PostAlimentacao(dto);
    return isValid ? Results.Ok("Refeição registrada com sucesso") : Results.BadRequest("Erro ao registrar refeição");
}).WithName("PostAlimentacao");

app.MapPost("/GetAlimentacao", (AlimentacaoRequestDTO dto) =>
{
    try
    {
        var response = Alimentacao.GetAlimentacao(dto);
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
}).WithName("GetAlimentacao");

app.MapPost("/PostAtFisica", (AtFisicaResponseDTO dto) =>
{
    bool isValid = AtFisica.PostAtFisica(dto);
    return isValid ? Results.Ok("Atividade física registrada com sucesso") : Results.BadRequest("Erro ao registrar atividade física");
}).WithName("PostAtFisica");

app.MapPost("/GetAtFisica", (AtFisicaRequestDTO dto) =>
{
    try
    {
        var response = AtFisica.GetAtFisica(dto);
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
}).WithName("GetAtFisica");

app.MapPost("/PostIMC", (IMCResponseDTO dto) =>
{
    bool isValid = IMC.PostIMC(dto);
    return isValid ? Results.Ok("IMC registrado com sucesso") : Results.BadRequest("Erro ao registrar IMC");
}).WithName("PostIMC");

app.MapPost("/GetIMC", (IMCRequestDTO dto) =>
{
    try
    {
        var response = IMC.GetIMC(dto);
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
}).WithName("GetIMC");

app.Run();
