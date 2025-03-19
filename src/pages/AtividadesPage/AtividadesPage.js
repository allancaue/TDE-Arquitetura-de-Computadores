import React, { useState, useEffect } from 'react';
import AtividadeCard from '../../component/AtividadeCard/AtividadeCard';
import FiltroComponent from '../../component/FiltroComponent/FiltroComponent';
import style from './AtividadesPage.module.css';
import searchIcon from '../../assets/img/search-icon.svg';
import exitIcon from '../../assets/img/exit-icon.svg';
import { db, auth } from '../../firebase'; // Importe o Firestore e o auth
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // Funções do Firestore
import { signOut } from "firebase/auth"; // Importe a função de logout
import { useNavigate } from 'react-router-dom'; // Para redirecionar o usuário

function AtividadesPage() {
  const [atividades, setAtividades] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [atividadesFiltradas, setAtividadesFiltradas] = useState([]);
  const navigate = useNavigate(); // Hook para redirecionamento

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

  // Recupera as atividades do Firestore
  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const q = query(collection(db, "atividades"), orderBy("data", "desc"));
        const querySnapshot = await getDocs(q);
        const atividadesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          data: doc.data().data?.toDate(),
        }));
        setAtividades(atividadesData);
        setAtividadesFiltradas(atividadesData);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
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
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra por nome
      );
    }

    // Aplicar filtros de data
    if (filtroAtivo.DATA && filtroAtivo.DATA !== 'Todos') {
      const intervalo = calcularIntervaloDatas(filtroAtivo.DATA);
      if (intervalo) {
        resultado = resultado.filter(item => {
          const dataAtividade = item.data; // Já é um objeto Date
          return dataAtividade >= intervalo.inicio && dataAtividade < intervalo.fim;
        });
      }
    }

    // Aplicar filtros de horário
    if (filtroAtivo.HORÁRIO && filtroAtivo.HORÁRIO !== 'Todos') {
      const periodoFiltro = {
        'Manhã': (data) => {
          const hora = data.getHours();
          return hora >= 6 && hora < 12;
        },
        'Tarde': (data) => {
          const hora = data.getHours();
          return hora >= 12 && hora < 18;
        },
        'Noite': (data) => {
          const hora = data.getHours();
          return hora >= 18 || hora < 6;
        }
      };

      resultado = resultado.filter(item =>
        periodoFiltro[filtroAtivo.HORÁRIO](item.data) // Filtra por horário
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
                  nome={`Login realizado por ${atividade.nome}`} // Exibe o nome do usuário
                  data={atividade.data.toLocaleDateString()} // Formata a data
                  horario={atividade.data.toLocaleTimeString()} // Formata o horário
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