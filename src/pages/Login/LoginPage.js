import React, { useState } from 'react';
import Botao from '../../component/Botao/Botao';
import Input from '../../component/Input/Input';
import style from './LoginPage.module.css';
import emailIcon from '../../assets/img/email-icon.svg';
import passwordIcon from '../../assets/img/password-icon.svg';
import eyeClosedIcon from '../../assets/img/eye-closed.svg';
import eyeOpenIcon from '../../assets/img/eye-open.svg';
import { auth } from '../../firebase'; // Importe o auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../../firebase'; // Importe o Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Funções do Firestore

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleLogin = async () => {
    try {
      // Autentica o usuário
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log("Usuário logado com sucesso:", user);

      // Registra a atividade no Firestore
      await addDoc(collection(db, "atividades"), {
        email: user.email,
        tipo: "login",
        data: serverTimestamp(), // Usa o timestamp do servidor
      });

      console.log("Atividade registrada com sucesso.");

      // Redireciona o usuário para a página inicial
      window.location.href = '/';
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      alert("Erro ao fazer login: " + error.message);
    }
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
            Não tem um login? <span>Clique aqui</span> para solicitar acesso
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