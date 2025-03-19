import UserList from '../../component/UserList/UserList';
import style from './ListaUsuarios.module.css';


function ListaUsuarios() {
  const BANCO = [
    {
      name: "Joao Martins Filho filho",
      email: "HtH0D@example.com"
    },
    {
      name: "Joao",
      email: "HtH0D@example.com"
    },
    {
      name: "Joao",
      email: "HtH0D@example.com"
    },
    {
      name: "Joao",
      email: "HtH0D@example.com"
    },
    {
      name: "Joao",
      email: "HtH0D@example.com"
    },
    {
      name: "Joao",
      email: "HtH0D@example.com"
    }
    ,
    {
      name: "Joao",
      email: "HtH0D@example.com"
    },
    {
      name: "Joao",
      email: "HtH0D@example.com"
    },
    {
      name: "Joao",
      email: "HtH0D@example.com"
    }
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
          : <p>Não existem logins pendentes.</p>
        }

      </div>

    </div>


  )

}

export default ListaUsuarios;