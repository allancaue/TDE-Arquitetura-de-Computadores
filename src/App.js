import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import AtividadesPage from "./pages/AtividadesPage/AtividadesPage";
import CadastroPage from "./pages/Cadastro/CadastroPage";
import ListaUsuarios from "./pages/ListaUsuarios/ListaUsuarios";
import HomeAdm from "./pages/HomeAdm/HomeAdm";
import ProtectedRoute from "./ProtectedRoute"; // Importe o componente de rota protegida

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* Rotas protegidas para administradores */}
        <Route
          path="/atividades"
          element={
            <ProtectedRoute>
              <AtividadesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <ListaUsuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/homeAdm"
          element={
            <ProtectedRoute>
              <HomeAdm />
            </ProtectedRoute>
          }
        />

        {/*<Route path="*" element={<NotFound />} />*/}{" "}
        {/* Rota para página 404 */}{" "}
        {/*Lembra de fazer a pagina de erro 404 n esquecer de forma nehuma */}
      </Routes>
    </Router>
  );
}

export default App;