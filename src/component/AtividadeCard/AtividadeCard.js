import React from 'react';
import style from './AtividadeCard.module.css';

function AtividadeCard({ nome, data, horario }) {
  return (
    <div className={style.cardContainer}>
      <div className={style.infoItem}>
        <span className={style.label}>Nome:</span> {nome}
      </div>
      <div className={style.infoItem}>
        <span className={style.label}>DATA:</span> {data}
      </div>
      <div className={style.infoItem}>
        <span className={style.label}>HORÁRIO:</span> {horario}
      </div>
    </div>
  );
}

export default AtividadeCard;