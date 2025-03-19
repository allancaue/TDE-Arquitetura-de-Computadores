import React, { useState, useEffect } from 'react';
import UserList from '../../component/UserList/UserList';
import style from './ListaUsuarios.module.css';
import { db } from '../../firebase'; // Importe o Firestore
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  // Busca os usuários do Firestore
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        const usuariosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  // Função para alternar o status "ativo" do usuário
  const toggleAtivo = async (id, ativo) => {
    try {
      await updateDoc(doc(db, "usuarios", id), { ativo: !ativo });
      setUsuarios(usuarios.map(user => 
        user.id === id ? { ...user, ativo: !ativo } : user
      ));
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.loginHeader}>
        <h1 className={style.title}>USUARIOS INOUT</h1>
        <p className={style.subtitle}>Aceite ou recuse os cadastros</p>
      </div>
      <div className={style.fichas}>
        {usuarios.length ? usuarios.map((user) => (
          <UserList
            key={user.id}
            id={user.id}
            name={user.nome}
            email={user.email}
            ativo={user.ativo}
            toggleAtivo={toggleAtivo}
          />
        )) : <p>Não existem logins pendentes.</p>}
      </div>
    </div>
  );
}

export default ListaUsuarios;