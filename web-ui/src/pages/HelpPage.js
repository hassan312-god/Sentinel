import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Mail, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Search,
  Mic,
  Command,
  Settings,
  Shield,
  Zap,
  Play,
  Download,
  FileText,
  Users,
  Globe,
  Github
} from 'lucide-react';

const HelpContainer = styled(motion.div)`
  flex: 1;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  overflow-y: auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.125rem;
  margin: 0;
`;

const SearchSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
  text-align: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 1.125rem;
  outline: none;
  margin-left: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const HelpGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const HelpSection = styled(motion.div)`
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

const FAQItem = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const FAQQuestion = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.75rem 0;
  text-align: left;

  &:hover {
    color: #FF6B35;
  }
`;

const FAQAnswer = styled(motion.div)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  line-height: 1.6;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const CommandList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommandItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  border-left: 4px solid #FF6B35;
`;

const CommandTrigger = styled.div`
  color: #FF6B35;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const CommandDescription = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
`;

const TutorialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TutorialItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
  }
`;

const TutorialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background: ${props => props.color};
  color: white;
`;

const TutorialInfo = styled.div`
  flex: 1;
`;

const TutorialTitle = styled.div`
  color: #FFFFFF;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const TutorialDescription = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`;

const TutorialDuration = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
`;

const SupportSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const SupportCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
  }
`;

const SupportIcon = styled.div`
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

const SupportTitle = styled.h3`
  color: #FFFFFF;
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
`;

const SupportDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin: 0;
`;

const QuickStartSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #FF6B35;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  color: #FFFFFF;
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
`;

const StepDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
`;

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Comment activer la reconnaissance vocale ?",
      answer: "Cliquez sur le bouton microphone dans la barre latérale ou utilisez le raccourci clavier Ctrl+Shift+M. L'assistant commencera à écouter vos commandes."
    },
    {
      id: 2,
      question: "Quelles sont les commandes vocales disponibles ?",
      answer: "Sentinel Voice comprend de nombreuses commandes : ouverture d'applications, contrôle système, navigation dans les dossiers, et commandes personnalisées que vous pouvez créer."
    },
    {
      id: 3,
      question: "Comment créer une commande personnalisée ?",
      answer: "Allez dans la page 'Commandes', cliquez sur 'Nouvelle Commande' et suivez l'assistant. Vous pouvez également utiliser le mode apprentissage vocal."
    },
    {
      id: 4,
      question: "Comment changer la voix de l'assistant ?",
      answer: "Dans les Paramètres > Synthèse Vocale, vous pouvez choisir entre la voix locale et la voix cloud ElevenLabs pour une qualité supérieure."
    },
    {
      id: 5,
      question: "L'assistant fonctionne-t-il hors-ligne ?",
      answer: "Oui, la reconnaissance vocale et la synthèse locale fonctionnent entièrement hors-ligne. Seules les voix cloud nécessitent une connexion internet."
    },
    {
      id: 6,
      question: "Comment améliorer la précision de la reconnaissance ?",
      answer: "Parlez clairement, utilisez un microphone de qualité, et ajustez la sensibilité dans les paramètres. L'assistant s'améliore avec l'utilisation."
    }
  ];

  const commands = [
    { trigger: "ouvre chrome", description: "Lance Google Chrome" },
    { trigger: "ferme notepad", description: "Ferme le Bloc-notes" },
    { trigger: "verrouille l'écran", description: "Verrouille le PC" },
    { trigger: "ouvre le dossier documents", description: "Ouvre le dossier Documents" },
    { trigger: "redémarre l'ordinateur", description: "Redémarre le PC" },
    { trigger: "éteins l'ordinateur", description: "Éteint le PC" },
    { trigger: "prends une capture d'écran", description: "Prend une capture d'écran" },
    { trigger: "ouvre les paramètres", description: "Ouvre les paramètres Windows" }
  ];

  const tutorials = [
    {
      id: 1,
      title: "Premiers pas avec Sentinel Voice",
      description: "Apprenez les bases de l'assistant vocal",
      duration: "5 min",
      icon: Play,
      color: "#27AE60"
    },
    {
      id: 2,
      title: "Créer des commandes personnalisées",
      description: "Personnalisez votre expérience vocale",
      duration: "8 min",
      icon: Command,
      color: "#3498DB"
    },
    {
      id: 3,
      title: "Configuration avancée",
      description: "Optimisez les paramètres pour vos besoins",
      duration: "12 min",
      icon: Settings,
      color: "#9B59B6"
    },
    {
      id: 4,
      title: "Sécurité et confidentialité",
      description: "Protégez vos données et votre vie privée",
      duration: "6 min",
      icon: Shield,
      color: "#E74C3C"
    }
  ];

  const supportOptions = [
    {
      title: "Documentation",
      description: "Guide complet et API",
      icon: BookOpen,
      color: "#27AE60",
      action: () => window.open('https://docs.sentinel-voice.com', '_blank')
    },
    {
      title: "Vidéos",
      description: "Tutoriels vidéo",
      icon: Video,
      color: "#3498DB",
      action: () => window.open('https://youtube.com/sentinel-voice', '_blank')
    },
    {
      title: "Support",
      description: "Contactez notre équipe",
      icon: MessageCircle,
      color: "#F39C12",
      action: () => window.open('mailto:support@sentinel-voice.com')
    },
    {
      title: "Communauté",
      description: "Forum et discussions",
      icon: Users,
      color: "#9B59B6",
      action: () => window.open('https://community.sentinel-voice.com', '_blank')
    },
    {
      title: "GitHub",
      description: "Code source et issues",
      icon: Github,
      color: "#34495E",
      action: () => window.open('https://github.com/sentinel-voice', '_blank')
    },
    {
      title: "Téléchargements",
      description: "Versions et mises à jour",
      icon: Download,
      color: "#E74C3C",
      action: () => window.open('https://sentinel-voice.com/downloads', '_blank')
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <HelpContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Title>Centre d'Aide</Title>
        <Subtitle>
          Trouvez rapidement l'aide dont vous avez besoin pour utiliser Sentinel Voice
        </Subtitle>
      </Header>

      <SearchSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <SearchBar>
          <Search size={24} color="rgba(255, 255, 255, 0.6)" />
          <SearchInput
            placeholder="Rechercher dans l'aide..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </SearchSection>

      <QuickStartSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <SectionHeader>
          <SectionIcon color="#FF6B35">
            <Zap size={24} />
          </SectionIcon>
          <SectionTitle>Démarrage Rapide</SectionTitle>
        </SectionHeader>
        
        <StepList>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Installer et lancer</StepTitle>
              <StepDescription>
                Téléchargez et installez Sentinel Voice, puis lancez l'application. 
                L'assistant se connectera automatiquement.
              </StepDescription>
            </StepContent>
          </StepItem>
          
          <StepItem>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Configurer le microphone</StepTitle>
              <StepDescription>
                Assurez-vous que votre microphone est connecté et fonctionne. 
                Testez la reconnaissance vocale dans les paramètres.
              </StepDescription>
            </StepContent>
          </StepItem>
          
          <StepItem>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Activer l'écoute</StepTitle>
              <StepDescription>
                Cliquez sur le bouton microphone ou dites "Sentinel" pour activer l'écoute. 
                L'assistant est prêt à recevoir vos commandes.
              </StepDescription>
            </StepContent>
          </StepItem>
          
          <StepItem>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>Essayer vos premières commandes</StepTitle>
              <StepDescription>
                Dites "ouvre chrome" ou "verrouille l'écran" pour tester. 
                L'assistant apprendra vos habitudes avec le temps.
              </StepDescription>
            </StepContent>
          </StepItem>
        </StepList>
      </QuickStartSection>

      <HelpGrid>
        {/* FAQ */}
        <HelpSection
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: -4 }}
        >
          <SectionHeader>
            <SectionIcon color="#27AE60">
              <HelpCircle size={24} />
            </SectionIcon>
            <SectionTitle>Questions Fréquentes</SectionTitle>
          </SectionHeader>
          
          <AnimatePresence>
            {filteredFAQs.map((faq) => (
              <FAQItem key={faq.id}>
                <FAQQuestion onClick={() => toggleFAQ(faq.id)}>
                  {faq.question}
                  {openFAQ === faq.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </FAQQuestion>
                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <FAQAnswer
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
          </AnimatePresence>
        </HelpSection>

        {/* Commandes de référence */}
        <HelpSection
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ y: -4 }}
        >
          <SectionHeader>
            <SectionIcon color="#3498DB">
              <Command size={24} />
            </SectionIcon>
            <SectionTitle>Commandes de Référence</SectionTitle>
          </SectionHeader>
          
          <CommandList>
            {commands.map((command, index) => (
              <CommandItem key={index}>
                <CommandTrigger>"{command.trigger}"</CommandTrigger>
                <CommandDescription>{command.description}</CommandDescription>
              </CommandItem>
            ))}
          </CommandList>
        </HelpSection>

        {/* Tutoriels */}
        <HelpSection
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ y: -4 }}
        >
          <SectionHeader>
            <SectionIcon color="#9B59B6">
              <Video size={24} />
            </SectionIcon>
            <SectionTitle>Tutoriels Vidéo</SectionTitle>
          </SectionHeader>
          
          <TutorialList>
            {tutorials.map((tutorial) => (
              <TutorialItem key={tutorial.id} onClick={() => console.log('Lancer tutoriel:', tutorial.id)}>
                <TutorialIcon color={tutorial.color}>
                  <tutorial.icon size={20} />
                </TutorialIcon>
                <TutorialInfo>
                  <TutorialTitle>{tutorial.title}</TutorialTitle>
                  <TutorialDescription>{tutorial.description}</TutorialDescription>
                </TutorialInfo>
                <TutorialDuration>{tutorial.duration}</TutorialDuration>
              </TutorialItem>
            ))}
          </TutorialList>
        </HelpSection>
      </HelpGrid>

      <SupportSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <SectionHeader>
          <SectionIcon color="#F39C12">
            <MessageCircle size={24} />
          </SectionIcon>
          <SectionTitle>Support et Ressources</SectionTitle>
        </SectionHeader>
        
        <SupportGrid>
          {supportOptions.map((option, index) => (
            <SupportCard
              key={index}
              onClick={option.action}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <SupportIcon color={option.color}>
                <option.icon size={24} />
              </SupportIcon>
              <SupportTitle>{option.title}</SupportTitle>
              <SupportDescription>{option.description}</SupportDescription>
            </SupportCard>
          ))}
        </SupportGrid>
      </SupportSection>
    </HelpContainer>
  );
};

export default HelpPage; 