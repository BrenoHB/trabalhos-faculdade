using System;
using Util.DB;
using MySql.Data.MySqlClient;
using VitalMoveDTO;
using Azure;

namespace Services.Alimentacao
{
    public class Alimentacao
    {
        public static bool PostAlimentacao(AlimentacaoResponseDTO AlimentacaoResponseDTO)
        {
            string conn = DbString.Context();
            string insertQuery = "INSERT INTO alimentacao (Horario, KCAL, Comentario, Alimentos, usuario) VALUES (@Horario, @KCAL, @Comentario, @Alimentos, @usuario)";

            try
            {
                using (var connection = new MySqlConnection(conn))
                {
                    connection.Open();
                    using (var insertCommand = new MySqlCommand(insertQuery, connection))
                    {
                        insertCommand.Parameters.AddWithValue("@Horario", AlimentacaoResponseDTO.Horario);
                        insertCommand.Parameters.AddWithValue("@KCAL", AlimentacaoResponseDTO.KCAL);
                        insertCommand.Parameters.AddWithValue("@Comentario", AlimentacaoResponseDTO.Comentario);
                        insertCommand.Parameters.AddWithValue("@usuario", AlimentacaoResponseDTO.Usuario);
                        insertCommand.Parameters.AddWithValue("@Alimentos", AlimentacaoResponseDTO.Alimentos);

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
        public static List<AlimentacaoResponseDTO> GetAlimentacao(AlimentacaoRequestDTO AlimentacaoRequestDTO)
        {
            List<AlimentacaoResponseDTO> response = new List<AlimentacaoResponseDTO>();

            string conn = DbString.Context();
            string selectQuery = "SELECT * FROM alimentacao WHERE usuario = @usuario";

            try
            {
                using (var connection = new MySqlConnection(conn))
                {
                    connection.Open();

                    using (var command = new MySqlCommand(selectQuery, connection))
                    {
                        command.Parameters.AddWithValue("@usuario", AlimentacaoRequestDTO.Usuario);

                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var item = new AlimentacaoResponseDTO
                                {
                                    Horario = reader.GetString("horario"),
                                    Comentario = reader.GetString("comentario"),
                                    Alimentos = reader.GetString("alimentos"),
                                    KCAL = reader.GetDouble("KCAL")
                                };

                                response.Add(item);
                            }
                        }
                    }
                }
                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar os dados: {ex.Message}");
            }

            return response;
        }
    }
}
