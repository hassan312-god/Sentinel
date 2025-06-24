@echo off

REM Couleurs (limitées sous Windows)

REM Vérification de Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Python n'est pas installe. Installez-le d'abord.
    exit /b 1
)

REM Création de l'environnement virtuel
if not exist .venv (
    echo Creation de l'environnement virtuel Python...
    python -m venv .venv
)

REM Activation de l'environnement virtuel
call .venv\Scripts\activate.bat

REM Installation des dépendances Python
pip install --upgrade pip
pip install -r requirements.txt

REM Vérification de npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js et npm ne sont pas installes. Installez-les pour l'UI React.
    echo Lien : https://nodejs.org/
    exit /b 1
)

REM Installation des dépendances Node.js
cd web-ui
if not exist node_modules (
    echo Installation des dependances Node.js...
    npm install
)
cd ..

echo.
echo Installation terminee !
echo Pour lancer le backend :
echo     .venv\Scripts\activate && python main.py
echo Pour lancer l'UI React :
echo     cd web-ui && npm start
pause 