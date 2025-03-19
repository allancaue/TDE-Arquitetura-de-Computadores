import UserList from '../../component/UserList/UserList';
import style from './ListaUsuarios.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';

function ListaUsuarios() {
  const BANCO = [
    
    
  ]


  return (

    <div className={style.container}>
      <div className={style.loginHeader}>
        <h1 className={style.title}>USUARIOS INOUT</h1>
        <p className={style.subtitle}>Aceite ou recuse os cadastros </p>

      </div>
      <div className={style.fichas}>
        {BANCO.length ? BANCO.map((item, index) => (
          <UserList key={index} name={item.name} email={item.email} />
        ))
          : <p>Não existem logins pendentes.
            <FontAwesomeIcon icon={faFaceFrown} size='2xl' opacity="0.8" />  
          </p>
            
        }

      </div>

    </div>


  )

}

export default ListaUsuarios;