import React, { useState } from 'react';
import Botao from '../../component/Botao/Botao';
import Input from '../../component/Input/Input';
import style from './LoginPage.module.css';
import emailIcon from '../../assets/img/email-icon.svg';
import passwordIcon from '../../assets/img/password-icon.svg';
import eyeClosedIcon from '../../assets/img/eye-closed.svg';
import eyeOpenIcon from '../../assets/img/eye-open.svg';
import { auth, db } from '../../firebase'; // Importe o Firestore
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Verifica se o usuário existe no Firestore
      const q = query(collection(db, "usuarios"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        alert("Usuário não encontrado.");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // Verifica se o usuário é administrador ou está ativo
      if (!userData.admin && !userData.ativo) {
        alert("Acesso negado. Entre em contato com o administrador.");
        return;
      }

      // Autentica o usuário
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log("Usuário logado com sucesso:", userCredential.user);

      // Salva a atividade de login no Firestore apenas se o usuário não for administrador
      if (!userData.admin) {
        await addDoc(collection(db, "atividades"), {
          nome: userData.nome,
          email: email,
          data: new Date(),
        });
      }

      // Redireciona o usuário
      if (userData.admin) {
        navigate("/homeAdm"); // Redireciona para a página de administração
      } else {
        navigate("/"); // Redireciona para a página inicial
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      alert("Erro ao fazer login: " + error.message);
    }
  };

  const handleIrParaCadastro = () => {
    navigate("/cadastro"); // Redireciona para a página de cadastro
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
            onChange={(e) => setEmail(e.target.value)}
            imagen1={emailIcon}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            imagen1={passwordIcon}
            imagen2={eyeClosedIcon}
            imagen3={eyeOpenIcon}
          />
          <p className={style.forgotPassword}>
            Não tem um login?{" "}
            <span onClick={handleIrParaCadastro}>Clique aqui</span> para
            solicitar acesso
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