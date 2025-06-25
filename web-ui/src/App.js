import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalStyles from './styles/GlobalStyles';

// Components
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import CommandsPage from './pages/CommandsPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled(motion.main)`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoadingContent = styled.div`
  text-align: center;
  color: #FFFFFF;
`;

const LoadingLogo = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const LoadingText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const LoadingSubtext = styled.div`
  font-size: 1rem;
  opacity: 0.8;
`;

const ConnectionStatus = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${props => props.connected ? 'rgba(39, 174, 96, 0.9)' : 'rgba(231, 76, 60, 0.9)'};
  color: #FFFFFF;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.connected ? '#27AE60' : '#E74C3C'};
  animation: ${props => props.show ? 'slideIn 0.3s ease' : 'slideOut 0.3s ease'};

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectionStatus, setShowConnectionStatus] = useState(false);

  // Simuler le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Simuler la connexion au backend
  useEffect(() => {
    const connectionTimer = setTimeout(() => {
      setIsConnected(true);
      setShowConnectionStatus(true);
      
      // Masquer le statut après 3 secondes
      setTimeout(() => {
        setShowConnectionStatus(false);
      }, 3000);
    }, 2500);

    return () => clearTimeout(connectionTimer);
  }, []);

  // Gestion des erreurs globales
  useEffect(() => {
    const handleError = (error) => {
      // Ici on pourrait envoyer l'erreur à un service de monitoring
    };

    const handleUnhandledRejection = (event) => {
      // Ici on pourrait envoyer l'erreur à un service de monitoring
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingContent>
          <LoadingLogo>
            <svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B35" stopOpacity="1" />
                  <stop offset="100%" stopColor="#E55A2B" stopOpacity="1" />
                </linearGradient>
              </defs>
              
              <circle cx="24" cy="24" r="22" fill="url(#loadingGradient)"/>
              <path d="M24 8L32 12V20C32 26.627 28.627 32 24 32C19.373 32 16 26.627 16 20V12L24 8Z" 
                    fill="white" opacity="0.9"/>
              <rect x="22" y="16" width="4" height="8" rx="2" fill="#FF6B35"/>
              <circle cx="24" cy="26" r="3" fill="#FF6B35"/>
              <circle cx="24" cy="12" r="2" fill="#27AE60"/>
            </svg>
          </LoadingLogo>
          <LoadingText>Sentinel Voice</LoadingText>
          <LoadingSubtext>Initialisation en cours...</LoadingSubtext>
        </LoadingContent>
      </LoadingScreen>
    );
  }

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Sidebar isConnected={isConnected} />
        
        <MainContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard isConnected={isConnected} />} 
              />
              <Route 
                path="/commands" 
                element={<CommandsPage />} 
              />
              <Route 
                path="/history" 
                element={<HistoryPage />} 
              />
              <Route 
                path="/settings" 
                element={<SettingsPage />} 
              />
              <Route 
                path="/help" 
                element={<HelpPage />} 
              />
            </Routes>
          </AnimatePresence>
        </MainContent>

        <AnimatePresence>
          {showConnectionStatus && (
            <ConnectionStatus 
              connected={isConnected}
              show={showConnectionStatus}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
            >
              {isConnected ? 'Connecté au backend' : 'Déconnecté du backend'}
            </ConnectionStatus>
          )}
        </AnimatePresence>
      </AppContainer>
    </>
  );
}

export default App; 