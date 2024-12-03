namespace VitalMoveDTO
{
    public class UserRegisterDTO
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? CPF { get; set; }
        private string Token = "1";
    }
}