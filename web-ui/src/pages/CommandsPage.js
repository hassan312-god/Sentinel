import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Command, 
  Plus, 
  Edit, 
  Trash2, 
  Mic, 
  Play, 
  Pause, 
  Save, 
  X,
  Search,
  Filter,
  Settings,
  Brain,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CommandsContainer = styled(motion.div)`
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

const SearchSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1rem;
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

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
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

const CommandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CommandCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CommandHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CommandInfo = styled.div`
  flex: 1;
`;

const CommandTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0 0 0.5rem 0;
`;

const CommandTrigger = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 107, 53, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const CommandDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

const CommandActions = styled.div`
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

const CommandStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);

  svg {
    margin-right: 0.25rem;
    width: 12px;
    height: 12px;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: rgba(44, 62, 80, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: #FFFFFF;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #FFFFFF;
  font-weight: 500;
  margin-bottom: 0.5rem;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

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

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
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
`;

const CommandsPage = () => {
  const [commands, setCommands] = useState([
    {
      id: 1,
      trigger: "ouvre chrome",
      action: "open_app",
      target: "chrome.exe",
      description: "Ouvre Google Chrome",
      category: "applications",
      usageCount: 15,
      lastUsed: "2024-01-15",
      isActive: true
    },
    {
      id: 2,
      trigger: "ferme notepad",
      action: "close_app",
      target: "notepad.exe",
      description: "Ferme le Bloc-notes",
      category: "applications",
      usageCount: 8,
      lastUsed: "2024-01-14",
      isActive: true
    },
    {
      id: 3,
      trigger: "verrouille l'écran",
      action: "system",
      target: "lock_screen",
      description: "Verrouille l'écran du PC",
      category: "system",
      usageCount: 23,
      lastUsed: "2024-01-15",
      isActive: true
    },
    {
      id: 4,
      trigger: "ouvre le dossier documents",
      action: "open_folder",
      target: "Documents",
      description: "Ouvre le dossier Documents",
      category: "navigation",
      usageCount: 12,
      lastUsed: "2024-01-13",
      isActive: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCommand, setEditingCommand] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const categories = [
    { id: 'all', name: 'Toutes', icon: Command },
    { id: 'applications', name: 'Applications', icon: Play },
    { id: 'system', name: 'Système', icon: Settings },
    { id: 'navigation', name: 'Navigation', icon: Brain },
    { id: 'custom', name: 'Personnalisées', icon: Zap }
  ];

  const filteredCommands = commands.filter(command => {
    const matchesSearch = command.trigger.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         command.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || command.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddCommand = () => {
    setEditingCommand(null);
    setShowModal(true);
  };

  const handleEditCommand = (command) => {
    setEditingCommand(command);
    setShowModal(true);
  };

  const handleDeleteCommand = (commandId) => {
    setCommands(commands.filter(cmd => cmd.id !== commandId));
  };

  const handleSaveCommand = (commandData) => {
    if (editingCommand) {
      setCommands(commands.map(cmd => 
        cmd.id === editingCommand.id ? { ...cmd, ...commandData } : cmd
      ));
    } else {
      const newCommand = {
        id: Date.now(),
        ...commandData,
        usageCount: 0,
        lastUsed: null,
        isActive: true
      };
      setCommands([...commands, newCommand]);
    }
    setShowModal(false);
  };

  const handleTestCommand = (command) => {
    // Simulation d'un test de commande
    console.log(`Test de la commande: ${command.trigger}`);
  };

  return (
    <CommandsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Title>Gestion des Commandes</Title>
        <HeaderActions>
          <ActionButton
            variant="primary"
            onClick={handleAddCommand}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus />
            Nouvelle Commande
          </ActionButton>
          <ActionButton
            onClick={() => setIsListening(!isListening)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? <Pause /> : <Mic />}
            {isListening ? 'Arrêter' : 'Apprentissage'}
          </ActionButton>
        </HeaderActions>
      </Header>

      <SearchSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <SearchBar>
          <Search size={20} color="rgba(255, 255, 255, 0.6)" />
          <SearchInput
            placeholder="Rechercher une commande..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <FilterButtons>
          {categories.map(category => (
            <FilterButton
              key={category.id}
              active={activeFilter === category.id}
              onClick={() => setActiveFilter(category.id)}
            >
              <category.icon size={16} style={{ marginRight: '0.5rem' }} />
              {category.name}
            </FilterButton>
          ))}
        </FilterButtons>
      </SearchSection>

      <CommandsGrid>
        <AnimatePresence>
          {filteredCommands.map((command, index) => (
            <CommandCard
              key={command.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <CommandHeader>
                <CommandInfo>
                  <CommandTitle>{command.description}</CommandTitle>
                  <CommandTrigger>"{command.trigger}"</CommandTrigger>
                  <CommandDescription>
                    Action: {command.action} → {command.target}
                  </CommandDescription>
                </CommandInfo>
                <CommandActions>
                  <IconButton onClick={() => handleTestCommand(command)}>
                    <Play size={16} />
                  </IconButton>
                  <IconButton onClick={() => handleEditCommand(command)}>
                    <Edit size={16} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCommand(command.id)}>
                    <Trash2 size={16} />
                  </IconButton>
                </CommandActions>
              </CommandHeader>
              <CommandStats>
                <Stat>
                  <Clock size={12} />
                  Utilisée {command.usageCount} fois
                </Stat>
                <Stat>
                  <CheckCircle size={12} />
                  {command.isActive ? 'Active' : 'Inactive'}
                </Stat>
              </CommandStats>
            </CommandCard>
          ))}
        </AnimatePresence>
      </CommandsGrid>

      <AnimatePresence>
        {showModal && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <ModalHeader>
                <ModalTitle>
                  {editingCommand ? 'Modifier la Commande' : 'Nouvelle Commande'}
                </ModalTitle>
                <CloseButton onClick={() => setShowModal(false)}>
                  <X />
                </CloseButton>
              </ModalHeader>
              
              <CommandForm
                command={editingCommand}
                onSave={handleSaveCommand}
                onCancel={() => setShowModal(false)}
              />
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </CommandsContainer>
  );
};

const CommandForm = ({ command, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    trigger: command?.trigger || '',
    action: command?.action || 'open_app',
    target: command?.target || '',
    description: command?.description || '',
    category: command?.category || 'applications'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Déclencheur vocal</Label>
        <Input
          type="text"
          placeholder="Ex: ouvre chrome"
          value={formData.trigger}
          onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Action</Label>
        <Select
          value={formData.action}
          onChange={(e) => setFormData({ ...formData, action: e.target.value })}
        >
          <option value="open_app">Ouvrir application</option>
          <option value="close_app">Fermer application</option>
          <option value="open_folder">Ouvrir dossier</option>
          <option value="system">Action système</option>
          <option value="custom">Action personnalisée</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>Cible</Label>
        <Input
          type="text"
          placeholder="Ex: chrome.exe ou Documents"
          value={formData.target}
          onChange={(e) => setFormData({ ...formData, target: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Description</Label>
        <TextArea
          placeholder="Description de la commande..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Catégorie</Label>
        <Select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="applications">Applications</option>
          <option value="system">Système</option>
          <option value="navigation">Navigation</option>
          <option value="custom">Personnalisées</option>
        </Select>
      </FormGroup>

      <ModalActions>
        <Button type="button" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" variant="primary">
          <Save size={16} style={{ marginRight: '0.5rem' }} />
          Enregistrer
        </Button>
      </ModalActions>
    </form>
  );
};

export default CommandsPage; 