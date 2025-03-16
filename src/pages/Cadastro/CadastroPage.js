import React, { useState } from "react";
import Botao from "../../component/Botao/Botao";
import Input from "../../component/Input/Input";
import style from "./CadastroPage.module.css";
import badgeIcon from "../../assets/img/badge-icon.svg";
import emailIcon from "../../assets/img/email-icon.svg";
import passwordIcon from "../../assets/img/password-icon.svg";
import eyeClosedIcon from "../../assets/img/eye-closed.svg";
import eyeOpenIcon from "../../assets/img/eye-open.svg";

function CadastroPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    mostrarSenha: false,
    mostrarConfirmarSenha: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMostrarSenha = () => {
    setForm({ ...form, mostrarSenha: !form.mostrarSenha });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Cadastro realizado com sucesso!");
  };

  const toggleMostrarConfirmarSenha = () => {
    setForm({ ...form, mostrarConfirmarSenha: !form.mostrarConfirmarSenha });
  };

  return (
    <div className={style.body}>
      <div className={style.cadastroCard}>
        <div className={style.cadastroHeader}>
          <h1 className={style.title}>CADASTRO</h1>
          <p className={style.subtitle}>
            Preencha os dados e espere a confirmação no email
          </p>
          <form>
            <div className="Input-group">
              <Input
                type="text"
                name="nome"
                placeholder="Nome Completo"
                value={form.nome}
                onChange={handleChange}
                imagen1={badgeIcon}
              />
            </div>

            <div className="Input-group">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                imagen1={emailIcon}
              />
            </div>

            <div className="Input-group">
              <Input
                type={form.mostrarSenha ? "text" : "password"}
                name="senha"
                placeholder="Senha"
                value={form.senha}
                onChange={handleChange}
                imagen1={passwordIcon}
                imagen2={eyeClosedIcon}
                imagen3={eyeOpenIcon}
              />
            </div>

            <div className="Input-group">
              <Input
                type={form.mostrarConfirmarSenha ? "text" : "password"}
                name="confirmarSenha"
                placeholder="Confirme a senha"
                value={form.confirmarSenha}
                onChange={handleChange}
                imagen1={passwordIcon}
                imagen2={eyeClosedIcon}
                imagen3={eyeOpenIcon}
              />
            </div>

            <div className={style.buttonContainer}>
              <Botao color="orengeButton" onClick={handleSubmit}>
                Cadastrar
              </Botao>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroPage;
