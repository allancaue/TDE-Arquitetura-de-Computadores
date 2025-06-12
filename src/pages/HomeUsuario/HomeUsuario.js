// HomeUsuario.js

import style from './HomeUsuario.module.css'; // reutilizando o CSS da HomeAdm
import Botao from '../../component/Botao/Botao';
import exitIcon from '../../assets/img/exit-icon.svg';
import { auth, db, rtdb } from '../../firebase';
import { signOut } from "firebase/auth";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, push, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HomeUsuario() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          alert("Usuário não encontrado.");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleCriarAtividade = async () => {
    try {
      if (!userData) {
        alert("Usuário não carregado.");
        return;
      }

      // Cria atividade no Firestore
      await addDoc(collection(db, "atividades"), {
        nome: userData.nome,
        email: userData.email,
        data: serverTimestamp(),
      });

      // Cria atividade no Realtime Database
      const atividadesRef = ref(rtdb, 'atividades');
      const novaAtividadeRef = push(atividadesRef);
      await set(novaAtividadeRef, {
        nome: userData.nome,
        email: userData.email,
        data: Date.now(),
      });

      alert("POrta aberta com sucesso!");
    } catch (error) {
      console.error("Erro ao Abrir Porta:", error.message);
      alert("Erro ao Abrir Porta: " + error.message);
    }
  };

  const handleSair = async () => {
    try {
      await signOut(auth);
      console.log('Usuário deslogado com sucesso.');
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
      alert('Erro ao fazer logout: ' + error.message);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.loginHeader}>
        <h1 className={style.title}>BEM-VINDO AO SISTEMA INOUT</h1>
        <p className={style.subtitle}>
          Clique no botão abaixo para abrir sua <span className={style.span}>porta</span>
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <Botao color="lightBlueButton" onClick={handleCriarAtividade}>
          Abrir Porta
        </Botao>
      </div>

      <footer className={style.footer}>
        <button className={style.sairButton} onClick={handleSair}>
          <img src={exitIcon} alt="Sair" className={style.exitIcon} />
          <span>SAIR</span>
        </button>
      </footer>
    </div>
  );
}

export default HomeUsuario;
