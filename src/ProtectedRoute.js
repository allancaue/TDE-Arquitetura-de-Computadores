import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/"); // Redireciona para a página de login se não estiver logado
        return;
      }

      // Verifica se o usuário é administrador
      const q = query(collection(db, "usuarios"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        navigate("/"); // Redireciona para a página de login se o usuário não for encontrado
        return;
      }

      const userDoc = querySnapshot.docs[0];
      if (!userDoc.data().admin) {
        navigate("/"); // Redireciona para a página inicial se não for admin
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAdmin();
  }, [navigate]);

  if (loading) {
    return <div>Carregando...</div>; // Exibe um loader enquanto verifica o admin
  }

  return isAdmin ? children : null; // Renderiza o conteúdo da rota apenas se for admin
};

export default ProtectedRoute;