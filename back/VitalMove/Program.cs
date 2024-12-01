using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VitalMoveDTO;
using Util.Login;
using Services.Alimentacao;
using Services.AtFisica;
using Services.IMC;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.MapPost("/login", (UserLoginDTO credentials) =>
{
    bool isValid = Login.Authenticate(credentials);
    if (isValid)
    {
        return Results.Ok("Login successful");
    }
    else
    {
        return Results.BadRequest("Invalid username or password");
    }
})
.WithName("Login");

app.MapPost("/register", (UserRegisterDTO credentials) =>
{
    bool isValid = Login.Register(credentials);
    if (isValid)
    {
        return Results.Ok("usuario foi registrado com suscesso!");
    }
    else
    {
        return Results.BadRequest("Usuario ja existente");
    }
})
.WithName("register");


app.MapPost("/PostAlimentacao", (AlimentacaoResponseDTO AlimentacaoResponseDTO) =>
{
    bool isValid = Alimentacao.PostAlimentacao(AlimentacaoResponseDTO);
    if (isValid)
    {
        return Results.Ok("Refeição não registrada com sucesso");
    }
    else
    {
        return Results.BadRequest("Refeição registrada com sucesso");
    }
})
.WithName("PostAlimentacao");

app.MapPost("/GetAlimentacao", (AlimentacaoRequestDTO AlimentacaoRequestDTO) =>
{
    try
    {
        List<AlimentacaoResponseDTO> listAlimentacaoResponseDTO = Alimentacao.GetAlimentacao(AlimentacaoRequestDTO);
        return Results.Ok(listAlimentacaoResponseDTO);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }




})
.WithName("GetAlimentacao");

app.MapPost("/PostAtFisica", (AtFisicaResponseDTO AtFisicaResponseDTO) =>
{
    bool isValid = AtFisica.PostAtFisica(AtFisicaResponseDTO);
    if (isValid)
    {
        return Results.Ok("Atividade registrada com sucesso");
    }
    else
    {
        return Results.BadRequest("Atividade não registrada com sucesso");
    }
})
.WithName("PostAtFisica");

app.MapPost("/GetAtFisica", (AtFisicaRequestDTO AtFisicaRequestDTO) =>
{
    try
    {
        List<AtFisicaResponseDTO> listAtFisicaResponseDTO = AtFisica.GetAtFisica(AtFisicaRequestDTO);
        return Results.Ok(listAtFisicaResponseDTO);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }




})
.WithName("GetAtFisica");




app.MapPost("/PostIMC", (IMCResponseDTO IMCResponseDTO) =>
{
    bool isValid = IMC.PostIMC(IMCResponseDTO);
    if (isValid)
    {
        return Results.Ok("Atividade registrada com sucesso");
    }
    else
    {
        return Results.BadRequest("Atividade não registrada com sucesso");
    }
})
.WithName("PostIMC");

app.MapPost("/GetIMC", (IMCRequestDTO IMCRequestDTO) =>
{
    try
    {
        List<IMCResponseDTO> listIMCResponseDTO = IMC.GetIMC(IMCRequestDTO);
        return Results.Ok(listIMCResponseDTO);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }




})
.WithName("GetIMC");


app.Run();

