import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;

      if (!user) {
        navigate("/");  // Não autenticado, redireciona para login
        return;
      }

      try {
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          console.warn("Usuário não encontrado no Firestore.");
          navigate("/");
          return;
        }

        const userData = userDocSnap.data();

        if (userData.admin) {
          setIsAdmin(true);
        } else {
          navigate("/");  // Não é admin, redireciona
        }

      } catch (error) {
        console.error("Erro ao verificar permissões:", error.message);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return isAdmin ? children : null;
};

export default ProtectedRoute;
