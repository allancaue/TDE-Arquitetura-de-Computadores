import React, { useState } from 'react';
import style from './FiltroComponent.module.css';

function FiltroComponent({ tiposFiltro, onFiltroChange }) {
  const [filtrosAtivos, setFiltrosAtivos] = useState({
    DATA: 'Todos',
    HORÁRIO: 'Todos'
  });

  const handleFiltroChange = (tipo, valor) => {
    const novosFiltros = { ...filtrosAtivos, [tipo]: valor };
    setFiltrosAtivos(novosFiltros);
    onFiltroChange(novosFiltros);
  };

  return (
    <div className={style.filtroContainer}>
      <h2 className={style.filtroTitle}>FILTROS</h2>
      
      {Object.keys(tiposFiltro).map(tipo => (
        <div key={tipo} className={style.filtroGroup}>
          <h3 className={style.filtroLabel}>{tipo}</h3>
          <div className={style.filtroOptions}>
            {tiposFiltro[tipo].map(opcao => (
              <div 
                key={opcao} 
                className={`${style.filtroOption} ${filtrosAtivos[tipo] === opcao ? style.active : ''}`}
                onClick={() => handleFiltroChange(tipo, opcao)}
              >
                {opcao}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FiltroComponent;