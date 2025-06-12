// ProtectedRoute.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [allowed, setAllowed] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPermission = async () => {
      const user = auth.currentUser;

      if (!user) {
        navigate("/");  // Redireciona se não estiver logado
        return;
      }

      try {
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          navigate("/");
          return;
        }

        const userData = userDocSnap.data();

        if (!userData.ativo) {
          alert("Usuário ainda não foi ativado.");
          navigate("/");
          return;
        }

        // Verifica permissões
        if (requireAdmin && userData.admin) {
          setAllowed(true); // admin acessando rota admin
        } else if (!requireAdmin && !userData.admin) {
          setAllowed(true); // usuário comum acessando rota de usuário
        } else {
          navigate("/"); // permissão negada
        }

      } catch (error) {
        console.error("Erro ao verificar permissões:", error.message);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [navigate, requireAdmin]);

  if (loading) return <div>Carregando...</div>;

  return allowed ? children : null;
};

export default ProtectedRoute;
