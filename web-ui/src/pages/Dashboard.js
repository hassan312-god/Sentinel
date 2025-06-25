import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Shield, 
  Brain, 
  Lock, 
  Wifi, 
  WifiOff, 
  Volume2, 
  Settings,
  Activity,
  Clock,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const DashboardContainer = styled(motion.div)`
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

const StatusBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  background: ${props => props.connected ? 'rgba(39, 174, 96, 0.2)' : 'rgba(231, 76, 60, 0.2)'};
  border: 1px solid ${props => props.connected ? '#27AE60' : '#E74C3C'};
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  color: ${props => props.connected ? '#27AE60' : '#E74C3C'};
  font-weight: 600;
  backdrop-filter: blur(10px);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background: ${props => props.color};
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
`;

const CardContent = styled.div`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
`;

const ControlSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const ControlTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
  }
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ControlButton = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
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

const RecentActivity = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 4px solid #FF6B35;
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background: ${props => props.color || '#FF6B35'};
  color: white;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  color: #FFFFFF;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
`;

const Dashboard = ({ isConnected }) => {
  const [isListening, setIsListening] = useState(false);

  const handleMicToggle = () => {
    setIsListening(!isListening);
  };

  return (
    <DashboardContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Title>Tableau de Bord</Title>
        <StatusBadge 
          connected={isConnected}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isConnected ? <Wifi size={18} /> : <WifiOff size={18} />}
          <span style={{ marginLeft: '0.5rem' }}>
            {isConnected ? 'Connecté' : 'Déconnecté'}
          </span>
        </StatusBadge>
      </Header>

      <Grid>
        <Card
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -4 }}
        >
          <CardHeader>
            <CardIcon color="#27AE60">
              <Mic size={24} />
            </CardIcon>
            <CardTitle>Reconnaissance Vocale</CardTitle>
          </CardHeader>
          <CardContent>
            Système de reconnaissance vocale actif et prêt à écouter vos commandes.
            <StatsGrid>
              <StatItem>
                <StatValue>98%</StatValue>
                <StatLabel>Précision</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>FR</StatValue>
                <StatLabel>Langue</StatLabel>
              </StatItem>
            </StatsGrid>
          </CardContent>
        </Card>

        <Card
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -4 }}
        >
          <CardHeader>
            <CardIcon color="#3498DB">
              <Brain size={24} />
            </CardIcon>
            <CardTitle>Intelligence Artificielle</CardTitle>
          </CardHeader>
          <CardContent>
            IA locale activée pour le traitement des commandes et l&apos;apprentissage.
            <StatsGrid>
              <StatItem>
                <StatValue>15</StatValue>
                <StatLabel>Commandes Apprises</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>2.3s</StatValue>
                <StatLabel>Temps de Réponse</StatLabel>
              </StatItem>
            </StatsGrid>
          </CardContent>
        </Card>

        <Card
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: -4 }}
        >
          <CardHeader>
            <CardIcon color="#E74C3C">
              <Shield size={24} />
            </CardIcon>
            <CardTitle>Sécurité Système</CardTitle>
          </CardHeader>
          <CardContent>
            Protection active contre les menaces et surveillance en temps réel.
            <StatsGrid>
              <StatItem>
                <StatValue>100%</StatValue>
                <StatLabel>Protection</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>0</StatValue>
                <StatLabel>Menaces</StatLabel>
              </StatItem>
            </StatsGrid>
          </CardContent>
        </Card>

        <Card
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ y: -4 }}
        >
          <CardHeader>
            <CardIcon color="#9B59B6">
              <Activity size={24} />
            </CardIcon>
            <CardTitle>Activité Récente</CardTitle>
          </CardHeader>
          <CardContent>
            Suivi des dernières actions et commandes exécutées.
            <StatsGrid>
              <StatItem>
                <StatValue>24</StatValue>
                <StatLabel>Commandes Aujourd&apos;hui</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>7</StatValue>
                <StatLabel>Jours Actifs</StatLabel>
              </StatItem>
            </StatsGrid>
          </CardContent>
        </Card>
      </Grid>

      <ControlSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <ControlTitle>
          <Mic size={24} />
          Contrôles Vocaux
        </ControlTitle>
        <ControlButtons>
          <ControlButton
            variant="primary"
            onClick={handleMicToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? <Pause /> : <Play />}
            {isListening ? 'Arrêter l&apos;Écoute' : 'Démarrer l&apos;Écoute'}
          </ControlButton>
          
          <ControlButton
            onClick={() => console.log('Test voix')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Volume2 />
            Test de la Voix
          </ControlButton>
          
          <ControlButton
            onClick={() => console.log('Réinitialiser')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw />
            Réinitialiser
          </ControlButton>
          
          <ControlButton
            onClick={() => console.log('Paramètres')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings />
            Paramètres
          </ControlButton>
        </ControlButtons>
      </ControlSection>

      <RecentActivity
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <ControlTitle>
          <Clock size={24} />
          Activité Récente
        </ControlTitle>
        <ActivityList>
          <AnimatePresence>
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <ActivityIcon color={activity.color}>
                  <activity.icon size={16} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>{activity.text}</ActivityText>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </AnimatePresence>
        </ActivityList>
      </RecentActivity>
    </DashboardContainer>
  );
};

export default Dashboard; 