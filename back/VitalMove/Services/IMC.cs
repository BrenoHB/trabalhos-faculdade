using System;
using Util.DB;
using MySql.Data.MySqlClient;
using VitalMoveDTO;
using Azure;

namespace Services.IMC
{
    public class IMC
    {
        public static bool PostIMC(IMCResponseDTO IMCResponseDTO)
        {
            string conn = DbString.Context();
            string insertQuery = "INSERT INTO IMC (IMC, altura, peso, usuario) VALUES (@IMC, @Altura, @Peso, @usuario)";
            IMCResponseDTO.IMC = IMCResponseDTO.Peso / (IMCResponseDTO.Altura / 100 * IMCResponseDTO.Altura / 100);
            try
            {
                using (var connection = new MySqlConnection(conn))
                {
                    connection.Open();
                    using (var insertCommand = new MySqlCommand(insertQuery, connection))
                    {
                        insertCommand.Parameters.AddWithValue("@IMC", IMCResponseDTO.IMC);
                        insertCommand.Parameters.AddWithValue("@Altura", IMCResponseDTO.Altura);
                        insertCommand.Parameters.AddWithValue("@Peso", IMCResponseDTO.Peso);
                        insertCommand.Parameters.AddWithValue("@usuario", IMCResponseDTO.Usuario);

                        insertCommand.ExecuteNonQuery();
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao registrar o dado: {ex.Message}");
                return false;
            }
        }
        public static List<IMCResponseDTO> GetIMC(IMCRequestDTO IMCRequestDTO)
        {
            List<IMCResponseDTO> response = new List<IMCResponseDTO>();

            string conn = DbString.Context();
            string selectQuery = "SELECT * FROM IMC WHERE usuario = @usuario";

            try
            {
                using (var connection = new MySqlConnection(conn))
                {
                    connection.Open();

                    using (var command = new MySqlCommand(selectQuery, connection))
                    {
                        command.Parameters.AddWithValue("@usuario", IMCRequestDTO.Usuario);

                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var item = new IMCResponseDTO
                                {
                                    IMC = reader.GetDouble("IMC"),
                                    Peso = reader.GetDouble("Peso"),
                                    Altura = reader.GetDouble("Altura")
                                };

                                response.Add(item);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar os dados: {ex.Message}");
            }

            return response;
        }
    }
}
