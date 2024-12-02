using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace util
{
    public static class Authenticate
    {
        public static string GenerateToken(string CPF)
        {
            string secretKey = Environment.GetEnvironmentVariable("SecretKey");

            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("A variável de ambiente 'SecretKey' não está configurada.");
            }
            if (secretKey.Length < 16)
            {
                throw new InvalidOperationException("A chave deve ter pelo menos 128 bits (16 caracteres).");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[] { new Claim("CPF", CPF) };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
