import style from './UserList.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

function UserList({ name, email }) {


    return(
        <div className={style.container}>
            <div className={style.name}>
                <p>NOME: {name} </p>
            </div>

            <div className={style.email}>
                <p>EMAIL: {email} </p>
            </div>


            <div className={style.buttonContent}>
                <FontAwesomeIcon icon={faSquareCheck} color = "#FF1586" size = "2xl" />
                <FontAwesomeIcon icon={faSquareXmark} color = "#FF0408" size = "2xl"/>
            </div>    
            
        </div>

    )
}

export default UserList;