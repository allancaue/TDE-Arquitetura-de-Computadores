import React, { useState, useEffect } from 'react';
import AtividadeCard from '../../component/AtividadeCard/AtividadeCard';
import FiltroComponent from '../../component/FiltroComponent/FiltroComponent';
import style from './AtividadesPage.module.css';
import searchIcon from '../../assets/img/search-icon.svg';
import exitIcon from '../../assets/img/exit-icon.svg';

function AtividadesPage() {
  const [atividades, setAtividades] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [atividadesFiltradas, setAtividadesFiltradas] = useState([]);

  // Tipos de filtro disponíveis
  const tiposFiltro = {
    DATA: ['Todos', 'Hoje', 'Última Semana', 'Último Mês'],
    HORÁRIO: ['Todos', 'Manhã', 'Tarde', 'Noite']
  };

  // Função para calcular o intervalo de datas
  const calcularIntervaloDatas = (filtro) => {
    const hoje = new Date();
    const inicioDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const fimDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1);

    if (filtro === 'Hoje') {
      return { inicio: inicioDia, fim: fimDia };
    } else if (filtro === 'Última Semana') {
      const inicioSemana = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 7);
      return { inicio: inicioSemana, fim: fimDia };
    } else if (filtro === 'Último Mês') {
      const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth() - 1, hoje.getDate());
      return { inicio: inicioMes, fim: fimDia };
    }

    return null;
  };

  // Simulação de uma chamada à API
  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const dadosSimulados = [
          { id: 1, nome: 'Reunião de Equipe', data: '2025-03-01', horario: '10:00' },
          { id: 2, nome: 'Treinamento React', data: '2025-03-01', horario: '16:00' },
          { id: 3, nome: 'Review de Projeto', data: '2025-03-02', horario: '11:30' },
          { id: 4, nome: 'Planejamento Mensal', data: '2025-03-13', horario: '09:30' },
          { id: 5, nome: 'Desenvolvimento UI', data: '2025-03-03', horario: '17:00' },
          { id: 6, nome: 'RGB UI', data: '2025-03-05', horario: '22:00' },
        ];
        
        setAtividades(dadosSimulados);
        setAtividadesFiltradas(dadosSimulados);
      } catch (error) {
        console.error('Erro ao buscar atividades:', error);
      }
    };

    fetchAtividades();
  }, []);

  // Efeito para aplicar filtros e pesquisa
  useEffect(() => {
    let resultado = [...atividades];

    // Aplicar filtro de pesquisa
    if (searchTerm) {
      resultado = resultado.filter(item => 
        item.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtros de data
    if (filtroAtivo.DATA && filtroAtivo.DATA !== 'Todos') {
      const intervalo = calcularIntervaloDatas(filtroAtivo.DATA);
      if (intervalo) {
        resultado = resultado.filter(item => {
          const dataAtividade = new Date(item.data);
          return dataAtividade >= intervalo.inicio && dataAtividade < intervalo.fim;
        });
      }
    }

    // Aplicar filtros de horário
    if (filtroAtivo.HORÁRIO && filtroAtivo.HORÁRIO !== 'Todos') {
      const periodoFiltro = {
        'Manhã': (horario) => {
          const hora = parseInt(horario.split(':')[0]);
          return hora >= 6 && hora < 12;
        },
        'Tarde': (horario) => {
          const hora = parseInt(horario.split(':')[0]);
          return hora >= 12 && hora < 18;
        },
        'Noite': (horario) => {
          const hora = parseInt(horario.split(':')[0]);
          return hora >= 18 || hora < 6;
        }
      };

      resultado = resultado.filter(item => 
        periodoFiltro[filtroAtivo.HORÁRIO](item.horario)
      );
    }

    setAtividadesFiltradas(resultado);
  }, [searchTerm, filtroAtivo, atividades]);

  const handleFiltroChange = (novosFiltros) => {
    setFiltroAtivo(novosFiltros);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSair = () => {
    console.log('Saindo do sistema...');
    // Implementar lógica de logout
  };

  return (
    <div className={style.pageContainer}>
      <header className={style.header}>
        <h1 className={style.pageTitle}>ATIVIDADES INOUT</h1>
      </header>

      <div className={style.contentContainer}>
        <main className={style.mainContent}>
          <div className={style.searchContainer}>
            <img src={searchIcon} alt="Pesquisar" className={style.searchIcon} />
            <input
              type="text"
              placeholder="Pesquisar"
              className={style.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className={style.atividadesContainer}>
            {atividadesFiltradas.length > 0 ? (
              atividadesFiltradas.map(atividade => (
                <AtividadeCard
                  key={atividade.id}
                  nome={atividade.nome}
                  data={atividade.data}
                  horario={atividade.horario}
                />
              ))
            ) : (
              <div className={style.noResults}>
                Nenhuma atividade encontrada.
              </div>
            )}
          </div>
        </main>

        <aside className={style.sidebar}>
          <FiltroComponent 
            tiposFiltro={tiposFiltro}
            onFiltroChange={handleFiltroChange}
          />
        </aside>
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

export default AtividadesPage;