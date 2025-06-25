import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { 
  Home, 
  Command, 
  History, 
  Settings, 
  HelpCircle, 
  Mic, 
  Lock,
  Wifi,
  WifiOff
} from 'lucide-react';

const SidebarContainer = styled(motion.aside)`
  width: 280px;
  background: linear-gradient(180deg, #2C3E50 0%, #34495E 100%);
  border-right: 2px solid #FF6B35;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #FF6B35, transparent);
  }
`;

const LogoSection = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #FF6B35, #E55A2B);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  overflow: hidden;
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #FF6B35;
  margin: 0;
`;

const StatusSection = styled(motion.div)`
  margin-bottom: 2rem;
`;

const StatusTitle = styled.h3`
  font-size: 0.75rem;
  color: #BDC3C7;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
`;

const StatusCard = styled(motion.div)`
  background: rgba(44, 62, 80, 0.8);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(44, 62, 80, 1);
    border-color: rgba(255, 107, 53, 0.3);
  }
`;

const StatusIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  background: ${props => props.color};
  color: white;
`;

const StatusText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.color || '#FFFFFF'};
`;

const NavigationSection = styled(motion.div)`
  flex: 1;
`;

const NavTitle = styled.h3`
  font-size: 0.75rem;
  color: #BDC3C7;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled(motion.li)`
  margin-bottom: 0.5rem;
`;

const NavLink = styled(motion.button)`
  width: 100%;
  background: ${props => props.active ? 'linear-gradient(135deg, #FF6B35, #E55A2B)' : 'transparent'};
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  color: ${props => props.active ? '#FFFFFF' : '#BDC3C7'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #E55A2B, #D44A1B)' : 'rgba(255, 107, 53, 0.1)'};
    color: #FFFFFF;
    transform: translateX(4px);
  }

  svg {
    margin-right: 0.75rem;
    width: 18px;
    height: 18px;
  }
`;

const MicButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #FF6B35, #E55A2B);
  border: none;
  border-radius: 12px;
  padding: 1rem;
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #E55A2B, #D44A1B);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    margin-right: 0.5rem;
    width: 20px;
    height: 20px;
  }
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: ${props => props.connected ? 'rgba(39, 174, 96, 0.2)' : 'rgba(231, 76, 60, 0.2)'};
  border: 1px solid ${props => props.connected ? '#27AE60' : '#E74C3C'};
  border-radius: 6px;
  margin-top: 1rem;
  font-size: 0.75rem;
  color: ${props => props.connected ? '#27AE60' : '#E74C3C'};
`;

const navItems = [
  { path: '/', icon: Home, label: 'Tableau de Bord' },
  { path: '/commands', icon: Command, label: 'Commandes' },
  { path: '/history', icon: History, label: 'Historique' },
  { path: '/settings', icon: Settings, label: 'Paramètres' },
  { path: '/help', icon: HelpCircle, label: 'Aide' },
];

const statusItems = [
  { icon: Mic, label: 'Reconnaissance Vocale', status: 'ACTIF', color: '#27AE60' },
  { icon: Brain, label: 'Intelligence Artificielle', status: 'CONNECTÉ', color: '#3498DB' },
  { icon: Lock, label: 'Sécurité Système', status: 'PROTÉGÉ', color: '#E74C3C' },
];

const Sidebar = ({ isConnected }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isListening, setIsListening] = useState(false);

  const handleMicClick = () => {
    setIsListening(!isListening);
    // Ici on enverrait la commande au backend Python
  };

  return (
    <SidebarContainer
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <LogoSection
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Logo>
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#F8F9FA" stopOpacity="1" />
              </linearGradient>
            </defs>
            
            {/* Bouclier de protection */}
            <path d="M24 8L32 12V20C32 26.627 28.627 32 24 32C19.373 32 16 26.627 16 20V12L24 8Z" 
                  fill="url(#logoGradient)"/>
            
            {/* Microphone */}
            <rect x="22" y="16" width="4" height="8" rx="2" fill="#FF6B35"/>
            <circle cx="24" cy="26" r="3" fill="#FF6B35"/>
            
            {/* Point de sécurité */}
            <circle cx="24" cy="12" r="2" fill="#27AE60"/>
          </svg>
        </Logo>
        <LogoText>Sentinel Voice</LogoText>
      </LogoSection>

      <StatusSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <StatusTitle>Statut de Protection</StatusTitle>
        <AnimatePresence>
          {statusItems.map((item, index) => (
            <StatusCard
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <StatusIcon color={item.color}>
                <item.icon size={16} />
              </StatusIcon>
              <StatusText color={item.color}>
                {item.label} - {item.status}
              </StatusText>
            </StatusCard>
          ))}
        </AnimatePresence>
      </StatusSection>

      <NavigationSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <NavTitle>Navigation</NavTitle>
        <NavList>
          <AnimatePresence>
            {navItems.map((item, index) => (
              <NavItem
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <NavLink
                  as="button"
                  active={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon />
                  {item.label}
                </NavLink>
              </NavItem>
            ))}
          </AnimatePresence>
        </NavList>
      </NavigationSection>

      <MicButton
        onClick={handleMicClick}
        animate={isListening ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mic />
        {isListening ? 'ÉCOUTE...' : 'PARLER'}
      </MicButton>

      <ConnectionStatus connected={isConnected}>
        {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
        <span style={{ marginLeft: '0.5rem' }}>
          {isConnected ? 'Connecté' : 'Déconnecté'}
        </span>
      </ConnectionStatus>
    </SidebarContainer>
  );
};

export default Sidebar; 