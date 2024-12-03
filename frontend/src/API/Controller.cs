using Microsoft.AspNetCore.Mvc;
using VitalMoveDTO;
using Util.Login;
using Services.Alimentacao;
using Services.AtFisica;
using Services.IMC;
using Microsoft.AspNetCore.Authorization;
using util;

namespace API.Controllers
{
    [ApiController]

    public class VitalMoveController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Log(UserLoginDTO credentials)
        {
            try{
            string usuario = Login.Authenticate(credentials);
            if (usuario !=null)
            {
                var loginResponse = new LoginResponseDTO { Token = Authenticate.GenerateToken(credentials.CPF), Usuario = usuario };
                return Ok(loginResponse);
            }
            return BadRequest("Invalid username or password");
        }catch{
            return BadRequest("Invalid username or password");
        }
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegisterDTO credentials)
        {
            bool isValid = Login.Register(credentials);
            return isValid ? Ok("Usuário registrado com sucesso!") : BadRequest("Usuário já existente");
        }

        [HttpPost("PostAlimentacao"), Authorize]
        public IActionResult PostAlimentacao([FromBody] AlimentacaoResponseDTO dto)
        {
            bool isValid = Alimentacao.PostAlimentacao(dto);
            return isValid ? Ok("Refeição registrada com sucesso") : BadRequest("Erro ao registrar refeição");
        }

        [HttpPost("GetAlimentacao"), Authorize]
        public IActionResult GetAlimentacao([FromBody] AlimentacaoRequestDTO dto)
        {
            try
            {
                var response = Alimentacao.GetAlimentacao(dto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("PostAtFisica"), Authorize]
        public IActionResult PostAtFisica([FromBody] AtFisicaResponseDTO dto)
        {
            bool isValid = AtFisica.PostAtFisica(dto);
            return isValid ? Ok("Atividade física registrada com sucesso") : BadRequest("Erro ao registrar atividade física");
        }

        [HttpPost("GetAtFisica"), Authorize]
        public IActionResult GetAtFisica([FromBody] AtFisicaRequestDTO dto)
        {
            try
            {
                var response = AtFisica.GetAtFisica(dto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("PostIMC"), Authorize]
        public IActionResult PostIMC([FromBody] IMCResponseDTO dto)
        {
            bool isValid = IMC.PostIMC(dto);
            return isValid ? Ok("IMC registrado com sucesso") : BadRequest("Erro ao registrar IMC");
        }

        [HttpPost("GetIMC"), Authorize]
        public IActionResult GetIMC([FromBody] IMCRequestDTO dto)
        {
            try
            {
                var response = IMC.GetIMC(dto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
