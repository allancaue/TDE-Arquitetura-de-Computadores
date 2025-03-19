import style from './HomeAdm.module.css';
import exitIcon from '../../assets/img/exit-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Importe o auth do Firebase
import { signOut } from "firebase/auth"; // Importe a função de logout

function HomeAdm() {
  const navigate = useNavigate();

  // Função para deslogar o usuário
  const handleSair = async () => {
    try {
      await signOut(auth); // Desloga o usuário
      console.log('Usuário deslogado com sucesso.');
      navigate('/'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
      alert('Erro ao fazer logout: ' + error.message);
    }
  };

  const handleIcon1Click = () => {
    navigate('/atividades'); 
  };

  const handleIcon2Click = () => {
    navigate('/usuarios'); 
  };

  return (
    <div className={style.container}>
      <div className={style.loginHeader}>
        <h1 className={style.title}>PAINEL ADMINISTRADOR INOUT</h1>
        <div className={style.icons}>
          <FontAwesomeIcon
            className={style.icon1}
            onClick={handleIcon1Click}
            icon={faClock}
            style={{ color: "#FFCCF2" }}
          />
          <FontAwesomeIcon
            className={style.icon2}
            onClick={handleIcon2Click}
            icon={faCircleUser}
            style={{ color: "#FFCCF2" }}
          />
        </div>
        <p className={style.subtitle}>
          Clique nos ícones acima para acessar as <span className={style.span}>funções</span>
        </p>
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

export default HomeAdm;