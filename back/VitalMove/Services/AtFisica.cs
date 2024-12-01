using System;
using Util.DB;
using MySql.Data.MySqlClient;
using VitalMoveDTO;
using Azure;

namespace Services.AtFisica
{
    public class AtFisica
    {
        public static bool PostAtFisica(AtFisicaResponseDTO AtFisicaResponseDTO)
        {
            string conn = DbString.Context();
            string insertQuery = "INSERT INTO atfisica (modalidade, KCAL, distancia, usuario, TempoDescanso, TempoExecMin) VALUES (@modalidade, @KCAL, @distancia, @usuario, @TempoDescanso, @TempoExecMin)";

            try
            {
                using (var connection = new MySqlConnection(conn))
                {
                    connection.Open();
                    using (var insertCommand = new MySqlCommand(insertQuery, connection))
                    {
                        insertCommand.Parameters.AddWithValue("@modalidade", AtFisicaResponseDTO.Modalidade);
                        insertCommand.Parameters.AddWithValue("@KCAL", AtFisicaResponseDTO.KCAL);
                        insertCommand.Parameters.AddWithValue("@distancia", AtFisicaResponseDTO.Distancia);
                        insertCommand.Parameters.AddWithValue("@usuario", AtFisicaResponseDTO.Usuario);
                        insertCommand.Parameters.AddWithValue("@TempoDescanso", AtFisicaResponseDTO.TempoD);
                        insertCommand.Parameters.AddWithValue("@TempoExecMin", AtFisicaResponseDTO.Tempo);

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
        public static List<AtFisicaResponseDTO> GetAtFisica(AtFisicaRequestDTO AtFisicaRequestDTO)
        {
            List<AtFisicaResponseDTO> response = new List<AtFisicaResponseDTO>();

            string conn = DbString.Context();
            string selectQuery = "SELECT * FROM AtFisica WHERE usuario = @usuario";

            try
            {
                using (var connection = new MySqlConnection(conn))
                {
                    connection.Open();

                    using (var command = new MySqlCommand(selectQuery, connection))
                    {
                        command.Parameters.AddWithValue("@usuario", AtFisicaRequestDTO.Usuario);

                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var item = new AtFisicaResponseDTO
                                {
                                    Modalidade = reader.GetString("Modalidade"),
                                    Tempo = reader.GetInt32("TempoExecMin"),
                                    Distancia = reader.GetInt32("Distancia"),
                                    KCAL = reader.GetDouble("KCAL"),
                                    TempoD = reader.GetInt32("TempoDescanso")
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
