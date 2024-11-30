import React from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask'; // Importando a biblioteca para aplicar a máscara
import api from '../services/api';
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate para navegação
import '../styles/Cadastro.css';

const Cadastro = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Hook de navegação

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/cadastro', data);
      if (response.data.success) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login'); // Após o cadastro, redireciona para o login
      } else {
        alert('Erro ao cadastrar.');
      }
    } catch (error) {
      alert('Erro ao tentar cadastro. Tente novamente.');
    }
  };

  // Função para cancelar e voltar para a página de login
  const handleCancel = () => {
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-title">Cadastro</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Campo de CPF com máscara */}
        <div className="form-group">
          <InputMask
            mask="999.999.999-99"
            {...register('cpf', { required: 'CPF é obrigatório' })}
            onChange={(e) => setValue('cpf', e.target.value)} // Atualiza o valor do campo no react-hook-form
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="text"
                placeholder="CPF"
                className={`input ${errors.cpf ? 'input-error' : ''}`}
              />
            )}
          </InputMask>
          {errors.cpf && <p className="error-text">{errors.cpf.message}</p>}
        </div>

        {/* Campo de senha */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            {...register('senha', { required: 'Senha é obrigatória' })}
            className={`input ${errors.senha ? 'input-error' : ''}`}
          />
          {errors.senha && <p className="error-text">{errors.senha.message}</p>}
        </div>

        {/* Campo de Data de Nascimento */}
        <div className="form-group">
          <input
            type="date"
            placeholder="Data de Nascimento"
            {...register('dataNasci', { required: 'Data de Nascimento é obrigatória' })}
            className={`input ${errors.dataNasci ? 'input-error' : ''}`}
          />
          {errors.dataNasci && <p className="error-text">{errors.dataNasci.message}</p>}
        </div>

        {/* Botões */}
        <div className="button-container">
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={handleCancel}>Cancelar</button> {/* Botão de Cancelar */}
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
