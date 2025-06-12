// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import AtividadesPage from "./pages/AtividadesPage/AtividadesPage";
import CadastroPage from "./pages/Cadastro/CadastroPage";
import ListaUsuarios from "./pages/ListaUsuarios/ListaUsuarios";
import HomeAdm from "./pages/HomeAdm/HomeAdm";
import HomeUsuario from "./pages/HomeUsuario/HomeUsuario";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* Rotas protegidas para administradores */}
        <Route
          path="/homeAdm"
          element={
            <ProtectedRoute requireAdmin={true}>
              <HomeAdm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/atividades"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AtividadesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute requireAdmin={true}>
              <ListaUsuarios />
            </ProtectedRoute>
          }
        />

        {/* Rota protegida para usuários comuns */}
        <Route
          path="/homeUsuario"
          element={
            <ProtectedRoute requireAdmin={false}>
              <HomeUsuario />
            </ProtectedRoute>
          }
        />

        {/* Rota de erro 404 (opcional) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
