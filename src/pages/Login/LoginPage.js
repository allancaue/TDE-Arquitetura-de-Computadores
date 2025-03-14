import React, { useState } from 'react';
import Botao from '../../component/Botao/Botao';
import Input from '../../component/Input/Input';
import style from './LoginPage.module.css';
import emailIcon from '../../assets/img/email-icon.svg';
import passwordIcon from '../../assets/img/password-icon.svg';
import eyeClosedIcon from '../../assets/img/eye-closed.svg';
import eyeOpenIcon from '../../assets/img/eye-open.svg';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleLogin = () => {
    console.log('Tentativa de login com:', { email, senha });
    // Aqui você adicionaria a lógica de autenticação
  };

  const handleEsqueciSenha = () => {
    console.log('Esqueci minha senha');
    // Implementar redirecionamento para página de recuperação de senha
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.loginCard}>
        <div className={style.loginHeader}>
          <h1 className={style.title}>SISTEMA INOUT</h1>
          <p className={style.subtitle}>Entre com o login</p>
        </div>
        
        <div className={style.formContainer}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            imagen1={emailIcon}
          />
          
          <Input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={handleSenhaChange}
            imagen1={passwordIcon}
            imagen2={eyeClosedIcon}
            imagen3={eyeOpenIcon}
          />
          
          <p className={style.forgotPassword}>
            Não tem um login? <span onClick={handleEsqueciSenha}>Clique aqui</span> para solicitar acesso
          </p>
          
          <div className={style.buttonContainer}>
            <Botao color="orengeButton" onClick={handleLogin}>
              Entrar
            </Botao>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;