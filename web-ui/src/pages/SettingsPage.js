import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Mic, 
  Volume2, 
  Globe, 
  Monitor, 
  Shield, 
  Save, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  Play,
  Pause,
  Zap,
  Moon,
  Sun,
  Palette,
  Languages,
  Keyboard,
  Headphones,
  Smartphone
} from 'lucide-react';

const SettingsContainer = styled(motion.div)`
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

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const SettingsSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background: ${props => props.color};
  color: white;
`;

const SectionTitle = styled.h2`
  color: #FFFFFF;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const SettingItem = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SettingLabel = styled.label`
  display: block;
  color: #FFFFFF;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const SettingDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #FF6B35;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #FF6B35;
  }

  option {
    background: #2C3E50;
    color: #FFFFFF;
  }
`;

const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FF6B35;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FF6B35;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
`;

const SliderValue = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
`;

const Toggle = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: 60px;
  height: 30px;
  background: ${props => props.active ? '#FF6B35' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 15px;
  transition: all 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #FFFFFF;
    top: 3px;
    left: ${props => props.active ? '33px' : '3px'};
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ToggleInput = styled.input`
  display: none;
`;

const ToggleLabel = styled.div`
  color: #FFFFFF;
  font-weight: 500;
  margin-left: 1rem;
`;

const VoiceTestSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const TestButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${props => props.status === 'connected' ? 'rgba(39, 174, 96, 0.2)' : 'rgba(231, 76, 60, 0.2)'};
  color: ${props => props.status === 'connected' ? '#27AE60' : '#E74C3C'};
  border: 1px solid ${props => props.status === 'connected' ? '#27AE60' : '#E74C3C'};

  svg {
    margin-right: 0.5rem;
    width: 14px;
    height: 14px;
  }
`;

const ColorPicker = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ColorOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color};
  cursor: pointer;
  border: 3px solid ${props => props.selected ? '#FFFFFF' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    voice: {
      useCloud: false,
      cloudProvider: 'elevenlabs',
      apiKey: '',
      voiceId: '21m00Tcm4TlvDq8ikWAM',
      rate: 180,
      volume: 85,
      pitch: 1.1,
      briefMode: true
    },
    recognition: {
      language: 'fr-FR',
      sensitivity: 0.8,
      timeout: 5,
      continuous: false,
      wakeWord: 'sentinel'
    },
    interface: {
      theme: 'dark',
      accentColor: '#FF6B35',
      animations: true,
      soundEffects: true,
      notifications: true
    },
    system: {
      autoStart: false,
      minimizeToTray: true,
      updateCheck: true,
      dataCollection: false
    }
  });

  const [isTestingVoice, setIsTestingVoice] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const accentColors = [
    '#FF6B35', '#E74C3C', '#3498DB', '#27AE60', 
    '#F39C12', '#9B59B6', '#1ABC9C', '#34495E'
  ];

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Sauvegarder les paramètres
    localStorage.setItem('sentinel-settings', JSON.stringify(settings));
    console.log('Paramètres sauvegardés:', settings);
  };

  const handleResetSettings = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      // Réinitialiser aux valeurs par défaut
      setSettings({
        voice: {
          useCloud: false,
          cloudProvider: 'elevenlabs',
          apiKey: '',
          voiceId: '21m00Tcm4TlvDq8ikWAM',
          rate: 180,
          volume: 85,
          pitch: 1.1,
          briefMode: true
        },
        recognition: {
          language: 'fr-FR',
          sensitivity: 0.8,
          timeout: 5,
          continuous: false,
          wakeWord: 'sentinel'
        },
        interface: {
          theme: 'dark',
          accentColor: '#FF6B35',
          animations: true,
          soundEffects: true,
          notifications: true
        },
        system: {
          autoStart: false,
          minimizeToTray: true,
          updateCheck: true,
          dataCollection: false
        }
      });
    }
  };

  const handleTestVoice = () => {
    setIsTestingVoice(true);
    // Simulation d'un test de voix
    setTimeout(() => {
      setIsTestingVoice(false);
    }, 2000);
  };

  useEffect(() => {
    // Charger les paramètres sauvegardés
    const savedSettings = localStorage.getItem('sentinel-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <SettingsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Title>Paramètres</Title>
        <HeaderActions>
          <ActionButton
            onClick={handleResetSettings}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw />
            Réinitialiser
          </ActionButton>
          <ActionButton
            variant="primary"
            onClick={handleSaveSettings}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save />
            Sauvegarder
          </ActionButton>
        </HeaderActions>
      </Header>

      <SettingsGrid>
        {/* Section Voix */}
        <SettingsSection
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -4 }}
        >
          <SectionHeader>
            <SectionIcon color="#27AE60">
              <Volume2 size={24} />
            </SectionIcon>
            <SectionTitle>Synthèse Vocale</SectionTitle>
          </SectionHeader>

          <SettingItem>
            <SettingLabel>Mode de synthèse</SettingLabel>
            <SettingDescription>
              Choisissez entre la synthèse locale ou cloud pour une meilleure qualité
            </SettingDescription>
            <Toggle
              active={settings.voice.useCloud}
              onClick={() => handleSettingChange('voice', 'useCloud', !settings.voice.useCloud)}
            >
              <ToggleInput
                type="checkbox"
                checked={settings.voice.useCloud}
                onChange={(e) => handleSettingChange('voice', 'useCloud', e.target.checked)}
              />
            </Toggle>
            <ToggleLabel>
              {settings.voice.useCloud ? 'Voix Cloud (ElevenLabs)' : 'Voix Locale'}
            </ToggleLabel>
          </SettingItem>

          {settings.voice.useCloud && (
            <>
              <SettingItem>
                <SettingLabel>Clé API ElevenLabs</SettingLabel>
                <SettingDescription>
                  Votre clé API pour accéder aux voix cloud
                </SettingDescription>
                <Input
                  type="password"
                  placeholder="Entrez votre clé API"
                  value={settings.voice.apiKey}
                  onChange={(e) => handleSettingChange('voice', 'apiKey', e.target.value)}
                />
                <StatusIndicator status={isConnected ? 'connected' : 'disconnected'}>
                  {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
                  {isConnected ? 'Connecté' : 'Déconnecté'}
                </StatusIndicator>
              </SettingItem>

              <SettingItem>
                <SettingLabel>Voix</SettingLabel>
                <SettingDescription>
                  Sélectionnez la voix cloud à utiliser
                </SettingDescription>
                <Select
                  value={settings.voice.voiceId}
                  onChange={(e) => handleSettingChange('voice', 'voiceId', e.target.value)}
                >
                  <option value="21m00Tcm4TlvDq8ikWAM">Rachel (Féminine)</option>
                  <option value="AZnzlk1XvdvUeBnXmlld">Domi (Féminine)</option>
                  <option value="EXAVITQu4vr4xnSDxMaL">Bella (Féminine)</option>
                  <option value="ErXwobaYiN019PkySvjV">Antoni (Masculine)</option>
                  <option value="MF3mGyEYCl7XYWbV9V6O">Elli (Féminine)</option>
                </Select>
              </SettingItem>
            </>
          )}

          <SettingItem>
            <SettingLabel>Vitesse de parole</SettingLabel>
            <SettingDescription>
              Ajustez la vitesse de la synthèse vocale
            </SettingDescription>
            <Slider
              type="range"
              min="100"
              max="300"
              value={settings.voice.rate}
              onChange={(e) => handleSettingChange('voice', 'rate', parseInt(e.target.value))}
            />
            <SliderValue>{settings.voice.rate} mots/min</SliderValue>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Volume</SettingLabel>
            <SettingDescription>
              Ajustez le volume de la synthèse vocale
            </SettingDescription>
            <Slider
              type="range"
              min="0"
              max="100"
              value={settings.voice.volume}
              onChange={(e) => handleSettingChange('voice', 'volume', parseInt(e.target.value))}
            />
            <SliderValue>{settings.voice.volume}%</SliderValue>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Réponses brèves</SettingLabel>
            <SettingDescription>
              Utilisez des réponses courtes ("OK", "C'est fait") pour une expérience plus fluide
            </SettingDescription>
            <Toggle
              active={settings.voice.briefMode}
              onClick={() => handleSettingChange('voice', 'briefMode', !settings.voice.briefMode)}
            >
              <ToggleInput
                type="checkbox"
                checked={settings.voice.briefMode}
                onChange={(e) => handleSettingChange('voice', 'briefMode', e.target.checked)}
              />
            </Toggle>
            <ToggleLabel>Activé</ToggleLabel>
          </SettingItem>

          <VoiceTestSection>
            <TestButton onClick={handleTestVoice} disabled={isTestingVoice}>
              {isTestingVoice ? <Pause size={16} /> : <Play size={16} />}
              {isTestingVoice ? 'Test en cours...' : 'Tester la voix'}
            </TestButton>
          </VoiceTestSection>
        </SettingsSection>

        {/* Section Reconnaissance Vocale */}
        <SettingsSection
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -4 }}
        >
          <SectionHeader>
            <SectionIcon color="#3498DB">
              <Mic size={24} />
            </SectionIcon>
            <SectionTitle>Reconnaissance Vocale</SectionTitle>
          </SectionHeader>

          <SettingItem>
            <SettingLabel>Langue</SettingLabel>
            <SettingDescription>
              Sélectionnez la langue principale pour la reconnaissance
            </SettingDescription>
            <Select
              value={settings.recognition.language}
              onChange={(e) => handleSettingChange('recognition', 'language', e.target.value)}
            >
              <option value="fr-FR">Français (France)</option>
              <option value="fr-CA">Français (Canada)</option>
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Español</option>
              <option value="de-DE">Deutsch</option>
            </Select>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Sensibilité du microphone</SettingLabel>
            <SettingDescription>
              Ajustez la sensibilité de la reconnaissance vocale
            </SettingDescription>
            <Slider
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={settings.recognition.sensitivity}
              onChange={(e) => handleSettingChange('recognition', 'sensitivity', parseFloat(e.target.value))}
            />
            <SliderValue>{Math.round(settings.recognition.sensitivity * 100)}%</SliderValue>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Mot d'éveil</SettingLabel>
            <SettingDescription>
              Mot ou phrase pour activer l'assistant vocal
            </SettingDescription>
            <Input
              type="text"
              placeholder="Ex: Sentinel"
              value={settings.recognition.wakeWord}
              onChange={(e) => handleSettingChange('recognition', 'wakeWord', e.target.value)}
            />
          </SettingItem>

          <SettingItem>
            <SettingLabel>Écoute continue</SettingLabel>
            <SettingDescription>
              L'assistant écoute en permanence (consomme plus de ressources)
            </SettingDescription>
            <Toggle
              active={settings.recognition.continuous}
              onClick={() => handleSettingChange('recognition', 'continuous', !settings.recognition.continuous)}
            >
              <ToggleInput
                type="checkbox"
                checked={settings.recognition.continuous}
                onChange={(e) => handleSettingChange('recognition', 'continuous', e.target.checked)}
              />
            </Toggle>
            <ToggleLabel>Activé</ToggleLabel>
          </SettingItem>
        </SettingsSection>

        {/* Section Interface */}
        <SettingsSection
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: -4 }}
        >
          <SectionHeader>
            <SectionIcon color="#9B59B6">
              <Monitor size={24} />
            </SectionIcon>
            <SectionTitle>Interface</SectionTitle>
          </SectionHeader>

          <SettingItem>
            <SettingLabel>Thème</SettingLabel>
            <SettingDescription>
              Choisissez le thème de l'interface
            </SettingDescription>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="radio"
                  id="dark"
                  name="theme"
                  value="dark"
                  checked={settings.interface.theme === 'dark'}
                  onChange={(e) => handleSettingChange('interface', 'theme', e.target.value)}
                />
                <label htmlFor="dark" style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Moon size={16} />
                  Sombre
                </label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="radio"
                  id="light"
                  name="theme"
                  value="light"
                  checked={settings.interface.theme === 'light'}
                  onChange={(e) => handleSettingChange('interface', 'theme', e.target.value)}
                />
                <label htmlFor="light" style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sun size={16} />
                  Clair
                </label>
              </div>
            </div>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Couleur d'accent</SettingLabel>
            <SettingDescription>
              Choisissez la couleur principale de l'interface
            </SettingDescription>
            <ColorPicker>
              {accentColors.map(color => (
                <ColorOption
                  key={color}
                  color={color}
                  selected={settings.interface.accentColor === color}
                  onClick={() => handleSettingChange('interface', 'accentColor', color)}
                />
              ))}
            </ColorPicker>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Animations</SettingLabel>
            <SettingDescription>
              Activez les animations et transitions de l'interface
            </SettingDescription>
            <Toggle
              active={settings.interface.animations}
              onClick={() => handleSettingChange('interface', 'animations', !settings.interface.animations)}
            >
              <ToggleInput
                type="checkbox"
                checked={settings.interface.animations}
                onChange={(e) => handleSettingChange('interface', 'animations', e.target.checked)}
              />
            </Toggle>
            <ToggleLabel>Activées</ToggleLabel>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Effets sonores</SettingLabel>
            <SettingDescription>
              Activez les effets sonores de l'interface
            </SettingDescription>
            <Toggle
              active={settings.interface.soundEffects}
              onClick={() => handleSettingChange('interface', 'soundEffects', !settings.interface.soundEffects)}
            >
              <ToggleInput
                type="checkbox"
                checked={settings.interface.soundEffects}
                onChange={(e) => handleSettingChange('interface', 'soundEffects', e.target.checked)}
              />
            </Toggle>
            <ToggleLabel>Activés</ToggleLabel>
          </SettingItem>
        </SettingsSection>

        {/* Section Système */}
        <SettingsSection
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ y: -4 }}
        >
          <SectionHeader>
            <SectionIcon color="#E74C3C">
              <Shield size={24} />
            </SectionIcon>
            <SectionTitle>Système</SectionTitle>
          </SectionHeader>

          <SettingItem>
            <SettingLabel>Démarrage automatique</SettingLabel>
            <SettingDescription>
              Lancez Sentinel Voice au démarrage de Windows
            </SettingDescription>
            <Toggle
              active={settings.system.autoStart}
              onClick={() => handleSettingChange('system', 'autoStart', !settings.system.autoStart)}
            >
              <ToggleInput
                type="checkbox"
                checked={settings.system.autoStart}
                onChange={(e) => handleSettingChange('system', 'autoStart', e.target.checked)}
              />
            </Toggle>
            <ToggleLabel>Activé</ToggleLabel>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Minimiser dans la barre des tâches</SettingLabel>
            <SettingDescription>
              Minimisez l'application dans la barre des tâches au lieu de la fermer
            </SettingDescription>
            <Toggle
              active={settings.system.minimizeToTray}
              onClick={() => handleSettingChange('system', 'minimizeToTray', !settings.system.minimizeToTray)}
            >
              <ToggleInput
                type="checkbox"
                checked={settings.system.minimizeToTray}
                onChange={(e) => handleSettingChange('system', 'minimizeToTray', e.target.checked)}
              />
            </Toggle>
            <ToggleLabel>Activé</ToggleLabel>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Vérification des mises à jour</SettingLabel>
            <SettingDescription>
              Vérifiez automatiquement les mises à jour disponibles
            </SettingDescription>
            <Toggle
              active={settings.system.updateCheck}
              onClick={() => handleSettingChange('system', 'updateCheck', !settings.system.updateCheck)}
            >
              <ToggleInput
                type="checkbox"
                checked={settings.system.updateCheck}
                onChange={(e) => handleSettingChange('system', 'updateCheck', e.target.checked)}
              />
            </Toggle>
            <ToggleLabel>Activé</ToggleLabel>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Collecte de données</SettingLabel>
            <SettingDescription>
              Autorisez la collecte de données anonymes pour améliorer le service
            </SettingDescription>
            <Toggle
              active={settings.system.dataCollection}
              onClick={() => handleSettingChange('system', 'dataCollection', !settings.system.dataCollection)}
            >
              <ToggleInput
                type="checkbox"
                checked={settings.system.dataCollection}
                onChange={(e) => handleSettingChange('system', 'dataCollection', e.target.checked)}
              />
            </Toggle>
            <ToggleLabel>Autorisé</ToggleLabel>
          </SettingItem>
        </SettingsSection>
      </SettingsGrid>
    </SettingsContainer>
  );
};

export default SettingsPage; 