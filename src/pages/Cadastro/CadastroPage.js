import React, { useState } from "react";
import Botao from "../../component/Botao/Botao";
import Input from "../../component/Input/Input";
import style from "./CadastroPage.module.css";
import badgeIcon from "../../assets/img/badge-icon.svg";
import emailIcon from "../../assets/img/email-icon.svg";
import passwordIcon from "../../assets/img/password-icon.svg";
import eyeClosedIcon from "../../assets/img/eye-closed.svg";
import eyeOpenIcon from "../../assets/img/eye-open.svg";
import { auth, db } from "../../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [erro, setErro] = useState("");

  const handleChangeName = (e) => {
    setNome(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeSenha = (e) => {
    setSenha(e.target.value);
  };

  const handleChangeConfirmarSenha = (e) => {
    setConfirmarSenha(e.target.value);
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const toggleMostrarConfirmarSenha = () => {
    setMostrarConfirmarSenha(!mostrarConfirmarSenha);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    try {
      // Cadastra o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Salva os dados do usuário no Firestore, com o uid como ID do documento
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: nome,
        email: email,
        ativo: false,
        admin: false
      });

      alert("Cadastro realizado com sucesso! Aguarde a aprovação do administrador.");
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
      setErro("");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
      setErro("Erro ao cadastrar usuário: " + error.message);
    }
  };

  return (
    <div className={style.boody}>
      <div className={style.cadastroCard}>
        <div className={style.cadastroHeader}>
          <h1 className={style.title}>CADASTRO</h1>
          <p className={style.subtitle}>
            Preencha os dados e espere a confirmação no email
          </p>
          {erro && <p className={style.erro}>{erro}</p>}
          <form onSubmit={handleSubmit}>
            <div className={style.InputGroup}>
              <Input
                type="text"
                name="nome"
                placeholder="Nome Completo"
                value={nome}
                onChange={handleChangeName}
                imagen1={badgeIcon}
              />
            </div>

            <div className={style.InputGroup}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
                imagen1={emailIcon}
              />
            </div>

            <div className={style.InputGroup}>
              <Input
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                placeholder="Senha"
                value={senha}
                onChange={handleChangeSenha}
                imagen1={passwordIcon}
                imagen2={eyeClosedIcon}
                imagen3={eyeOpenIcon}
                onToggle={toggleMostrarSenha}
              />
            </div>

            <div className={style.InputGroup}>
              <Input
                type={mostrarConfirmarSenha ? "text" : "password"}
                name="confirmarSenha"
                placeholder="Confirme a senha"
                value={confirmarSenha}
                onChange={handleChangeConfirmarSenha}
                imagen1={passwordIcon}
                imagen2={eyeClosedIcon}
                imagen3={eyeOpenIcon}
                onToggle={toggleMostrarConfirmarSenha}
              />
            </div>

            <div className={style.buttonContainer}>
              <Botao type="submit" color="orengeButton">
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
