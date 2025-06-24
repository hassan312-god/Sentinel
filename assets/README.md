# Personnalisation de Sentinel Voice

## Sons personnalisés
- Placez vos fichiers .wav ou .mp3 dans le dossier `assets/sounds/`.
- Dans les paramètres ou le code, vous pouvez choisir le son pour chaque événement (succès, apprentissage, erreur, etc.).

## Avatars animés
- Placez vos GIFs animés dans `assets/avatars/`.
- Dans les paramètres, sélectionnez l'avatar à utiliser (ex : avatar_anim.gif).

## Thèmes
- Les thèmes sont définis par des fichiers JSON dans `assets/themes/`.
- Un thème peut définir les couleurs principales, secondaires, polices, etc.
- Exemple de thème :
```json
{
  "background": "#23272A",
  "primary": "#5865F2",
  "success": "#43B581",
  "error": "#F04747",
  "font": "#fff"
}
```
- Sélectionnez le thème dans les paramètres pour l'appliquer dynamiquement. 