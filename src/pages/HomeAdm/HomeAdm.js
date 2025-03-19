import style from './HomeAdm.module.css';
import exitIcon from '../../assets/img/exit-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { useNavigate } from 'react-router-dom';

function HomeAdm() {

    const handleSair = () => {
        console.log('Saindo do sistema...');
        // Implementar lógica de logout
      };

      const navigate = useNavigate();

      const handleIcon1Click = () => {
        navigate('/atividades'); 
    };

    const handleIcon2Click = () => {
        navigate('/usuarios'); 
    };
    
    return (
        <div className={style.container}>
            <div className={style.loginHeader}>
                <h1 className={style.title}>PAINEL ADMNISTRADOR INOUT</h1>
                <div className={style.icons}>
                    <FontAwesomeIcon className={style.icon1} onClick={handleIcon1Click} icon={faClock} style={{color: "FFCCF2",}}/>
                    <FontAwesomeIcon className={style.icon2} onClick={handleIcon2Click} icon={faCircleUser} style={{color: "FFCCF2",}} />
                </div>
                <p className={style.subtitle}>Clique nos incones acima para acessar as <span className={style.span}>funções</span></p>

        </div>

        <footer className={style.footer}>
            <button className={style.sairButton} onClick={handleSair}>
            <img src={exitIcon} alt="Sair" className={style.exitIcon} />
            <span>SAIR</span>
            </button>
        </footer>

        </div>
            
)
}

export default HomeAdm;