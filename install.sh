#!/bin/bash

set -e

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérification de Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python3 n'est pas installé. Installez-le d'abord.${NC}"
    exit 1
fi

# Création de l'environnement virtuel
if [ ! -d ".venv" ]; then
    echo -e "${GREEN}Création de l'environnement virtuel Python...${NC}"
    python3 -m venv .venv
fi
source .venv/bin/activate

# Installation des dépendances Python
echo -e "${GREEN}Installation des dépendances Python...${NC}"
pip install --upgrade pip
pip install -r requirements.txt

# Vérification de Node.js et npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Node.js et npm ne sont pas installés. Installez-les pour l'UI React.${NC}"
    echo -e "${RED}Lien : https://nodejs.org/${NC}"
    exit 1
fi

# Installation des dépendances Node.js
cd web-ui
if [ ! -d "node_modules" ]; then
    echo -e "${GREEN}Installation des dépendances Node.js...${NC}"
    npm install
fi
cd ..

echo -e "\n${GREEN}Installation terminée !${NC}"
echo -e "\nPour lancer le backend : ${GREEN}source .venv/bin/activate && python main.py${NC}"
echo -e "Pour lancer l'UI React : ${GREEN}cd web-ui && npm start${NC}" 