import React, { useState } from 'react';
import Botao from '../../component/Botao/Botao';
import Input from '../../component/Input/Input';
import style from './LoginPage.module.css';
import emailIcon from '../../assets/img/email-icon.svg';
import passwordIcon from '../../assets/img/password-icon.svg';
import eyeClosedIcon from '../../assets/img/eye-closed.svg';
import eyeOpenIcon from '../../assets/img/eye-open.svg';
import { auth, db, rtdb } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, push, set } from 'firebase/database';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Autentica o usuário
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log("Usuário autenticado com sucesso:", user.uid);

      // Busca os dados do usuário no Firestore usando o UID
      const userDocRef = doc(db, "usuarios", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        alert("Usuário não encontrado no Firestore.");
        return;
      }

      const userData = userDocSnap.data();

      // Verifica se o usuário está ativo
      if (!userData.ativo) {
        alert("Acesso negado. Aguarde a ativação pelo administrador.");
        return;
      }

      // Se não for admin, salva a atividade de login
      if (!userData.admin) {
        // Grava no Firestore
        await addDoc(collection(db, "atividades"), {
          nome: userData.nome,
          email: userData.email,
          data: serverTimestamp(),  // Timestamp do Firebase
        });

        // Grava no Realtime Database
        const atividadesRef = ref(rtdb, 'atividades');
        const novaAtividadeRef = push(atividadesRef);
        await set(novaAtividadeRef, {
          nome: userData.nome,
          email: userData.email,
          data: Date.now(),  // timestamp em ms, o ESP32 pode interpretar
        });
      }

      // Redireciona conforme o perfil
      if (userData.admin) {
        navigate("/homeAdm");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      alert("Erro ao fazer login: " + error.message);
    }
  };

  const handleIrParaCadastro = () => {
    navigate("/cadastro");
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
            <span onClick={handleIrParaCadastro}>Clique aqui</span> para solicitar acesso
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
