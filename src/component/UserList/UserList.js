import style from './UserList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

function UserList({ id, name, email, ativo, toggleAtivo }) {
  return (
    <div className={style.container}>
      <div className={style.userInfo}>
        <div className={style.name}>
          <p>NOME: {name}</p>
        </div>
        <div className={style.email}>
          <p>EMAIL: {email}</p>
        </div>
      </div>
      <div className={style.buttonContent}>
        <button onClick={() => toggleAtivo(id, ativo)}>
          <FontAwesomeIcon
            icon={ativo ? faToggleOn : faToggleOff}
            color={ativo ? "#4CAF50" : "#FF0408"}
            size="2xl"
          />
        </button>
      </div>
    </div>
  );
}

export default UserList;