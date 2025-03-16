import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import AtividadesPage from "./pages/AtividadesPage/AtividadesPage";
import CadastroPage from "./pages/Cadastro/CadastroPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/atividades" element={<AtividadesPage />} />
        {/*<Route path="*" element={<NotFound />} />*/}{" "}
        {/* Rota para página 404 */}{" "}
        {/*Lembra de fazer a pagina de erro 404 n esquecer de forma nehuma */}
      </Routes>
    </Router>
  );
}

export default App;
