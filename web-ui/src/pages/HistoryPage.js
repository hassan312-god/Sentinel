import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Calendar, 
  Clock, 
  Mic, 
  Volume2, 
  CheckCircle, 
  AlertCircle, 
  Filter,
  Download,
  Trash2,
  Search,
  BarChart3,
  TrendingUp,
  Activity,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

const HistoryContainer = styled(motion.div)`
  flex: 1;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  overflow-y: auto;
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.variant === 'primary' ? 'linear-gradient(135deg, #FF6B35, #E55A2B)' : 'rgba(255, 255, 255, 0.1)'};
  color: #FFFFFF;
  border: 1px solid ${props => props.variant === 'primary' ? 'transparent' : 'rgba(255, 255, 255, 0.2)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const StatsSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  background: ${props => props.color};
  color: white;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`;

const FilterSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex: 1;
  min-width: 300px;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 1rem;
  outline: none;
  margin-left: 0.5rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const DateRange = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DateInput = styled.input`
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #FF6B35;
  }
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: ${props => props.active ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  color: #FFFFFF;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 107, 53, 0.2);
  }
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HistoryItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    border-color: rgba(255, 107, 53, 0.3);
  }
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const HistoryInfo = styled.div`
  flex: 1;
`;

const HistoryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0 0 0.5rem 0;
`;

const HistoryTime = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;

  svg {
    margin-right: 0.5rem;
    width: 14px;
    height: 14px;
  }
`;

const HistoryCommand = styled.div`
  background: rgba(255, 107, 53, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #FFFFFF;
  font-size: 0.875rem;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const HistoryResponse = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  line-height: 1.5;
`;

const HistoryStatus = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.success ? 'rgba(39, 174, 96, 0.2)' : 'rgba(231, 76, 60, 0.2)'};
  color: ${props => props.success ? '#27AE60' : '#E74C3C'};
  border: 1px solid ${props => props.success ? '#27AE60' : '#E74C3C'};

  svg {
    margin-right: 0.5rem;
    width: 12px;
    height: 12px;
  }
`;

const HistoryActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const ChartSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const ChartTitle = styled.h2`
  color: #FFFFFF;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.75rem;
  }
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.125rem;
`;

const HistoryPage = () => {
  const [history, setHistory] = useState([
    {
      id: 1,
      timestamp: '2024-01-15T14:30:00',
      command: 'ouvre chrome',
      response: 'OK',
      success: true,
      duration: 2.3,
      confidence: 0.95
    },
    {
      id: 2,
      timestamp: '2024-01-15T14:25:00',
      command: 'ferme notepad',
      response: 'C\'est fait',
      success: true,
      duration: 1.8,
      confidence: 0.92
    },
    {
      id: 3,
      timestamp: '2024-01-15T14:20:00',
      command: 'verrouille l\'écran',
      response: 'OK',
      success: true,
      duration: 2.1,
      confidence: 0.88
    },
    {
      id: 4,
      timestamp: '2024-01-15T14:15:00',
      command: 'ouvre spotify',
      response: 'Application non trouvée',
      success: false,
      duration: 3.2,
      confidence: 0.85
    },
    {
      id: 5,
      timestamp: '2024-01-15T14:10:00',
      command: 'ouvre le dossier documents',
      response: 'OK',
      success: true,
      duration: 1.9,
      confidence: 0.94
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = {
    totalCommands: history.length,
    successRate: Math.round((history.filter(h => h.success).length / history.length) * 100),
    averageDuration: Math.round(history.reduce((acc, h) => acc + h.duration, 0) / history.length * 10) / 10,
    todayCommands: history.filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString()).length
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.response.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = (!dateFrom || new Date(item.timestamp) >= new Date(dateFrom)) &&
                       (!dateTo || new Date(item.timestamp) <= new Date(dateTo));
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'success' && item.success) ||
                         (statusFilter === 'error' && !item.success);
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  const handleClearHistory = () => {
    if (window.confirm('Êtes-vous sûr de vouloir effacer tout l\'historique ?')) {
      setHistory([]);
    }
  };

  const handleExportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sentinel-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
    return `Il y a ${Math.floor(diffInMinutes / 1440)}j`;
  };

  return (
    <HistoryContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Title>Historique des Interactions</Title>
        <HeaderActions>
          <ActionButton
            onClick={handleExportHistory}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download />
            Exporter
          </ActionButton>
          <ActionButton
            onClick={handleClearHistory}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 />
            Effacer
          </ActionButton>
        </HeaderActions>
      </Header>

      <StatsSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <StatCard whileHover={{ y: -4 }}>
          <StatIcon color="#27AE60">
            <Mic size={24} />
          </StatIcon>
          <StatValue>{stats.totalCommands}</StatValue>
          <StatLabel>Commandes Totales</StatLabel>
        </StatCard>

        <StatCard whileHover={{ y: -4 }}>
          <StatIcon color="#3498DB">
            <CheckCircle size={24} />
          </StatIcon>
          <StatValue>{stats.successRate}%</StatValue>
          <StatLabel>Taux de Réussite</StatLabel>
        </StatCard>

        <StatCard whileHover={{ y: -4 }}>
          <StatIcon color="#F39C12">
            <Clock size={24} />
          </StatIcon>
          <StatValue>{stats.averageDuration}s</StatValue>
          <StatLabel>Durée Moyenne</StatLabel>
        </StatCard>

        <StatCard whileHover={{ y: -4 }}>
          <StatIcon color="#9B59B6">
            <Activity size={24} />
          </StatIcon>
          <StatValue>{stats.todayCommands}</StatValue>
          <StatLabel>Aujourd'hui</StatLabel>
        </StatCard>
      </StatsSection>

      <ChartSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <ChartTitle>
          <BarChart3 size={24} />
          Statistiques d'Utilisation
        </ChartTitle>
        <ChartPlaceholder>
          Graphique des interactions vocales (à implémenter avec Chart.js ou Recharts)
        </ChartPlaceholder>
      </ChartSection>

      <FilterSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <FilterRow>
          <SearchBar>
            <Search size={20} color="rgba(255, 255, 255, 0.6)" />
            <SearchInput
              placeholder="Rechercher dans l'historique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>

          <DateRange>
            <DateInput
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>à</span>
            <DateInput
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </DateRange>

          <FilterButton
            active={statusFilter === 'all'}
            onClick={() => setStatusFilter('all')}
          >
            Toutes
          </FilterButton>
          <FilterButton
            active={statusFilter === 'success'}
            onClick={() => setStatusFilter('success')}
          >
            Succès
          </FilterButton>
          <FilterButton
            active={statusFilter === 'error'}
            onClick={() => setStatusFilter('error')}
          >
            Erreurs
          </FilterButton>
        </FilterRow>
      </FilterSection>

      <HistoryList>
        <AnimatePresence>
          {filteredHistory.map((item, index) => (
            <HistoryItem
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <HistoryHeader>
                <HistoryInfo>
                  <HistoryTime>
                    <Clock size={14} />
                    {formatTime(item.timestamp)} ({getTimeAgo(item.timestamp)})
                  </HistoryTime>
                  <HistoryCommand>"{item.command}"</HistoryCommand>
                  <HistoryResponse>{item.response}</HistoryResponse>
                </HistoryInfo>
                <HistoryActions>
                  <HistoryStatus success={item.success}>
                    {item.success ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                    {item.success ? 'Succès' : 'Erreur'}
                  </HistoryStatus>
                  <IconButton onClick={() => console.log('Rejouer:', item.command)}>
                    <Play size={16} />
                  </IconButton>
                </HistoryActions>
              </HistoryHeader>
            </HistoryItem>
          ))}
        </AnimatePresence>
      </HistoryList>
    </HistoryContainer>
  );
};

export default HistoryPage; 