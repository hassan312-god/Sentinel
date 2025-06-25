#!/usr/bin/env python3
"""
Script pour collecter et afficher les métriques du projet Sentinel Voice
"""

import requests
import json
import os
import subprocess
from datetime import datetime, timedelta

class SentinelMetrics:
    def __init__(self, repo_owner="hassan312-god", repo_name="Sentinel"):
        self.repo_owner = repo_owner
        self.repo_name = repo_name
        self.api_base = "https://api.github.com"
        self.token = os.getenv('GITHUB_TOKEN')
        
    def get_headers(self):
        """Retourne les headers pour l'API GitHub"""
        headers = {'Accept': 'application/vnd.github.v3+json'}
        if self.token:
            headers['Authorization'] = f'token {self.token}'
        return headers
    
    def get_repo_stats(self):
        """Récupère les statistiques du repository"""
        url = f"{self.api_base}/repos/{self.repo_owner}/{self.repo_name}"
        response = requests.get(url, headers=self.get_headers())
        
        if response.status_code == 200:
            data = response.json()
            return {
                'stars': data['stargazers_count'],
                'forks': data['forks_count'],
                'watchers': data['watchers_count'],
                'open_issues': data['open_issues_count'],
                'language': data['language'],
                'created_at': data['created_at'],
                'updated_at': data['updated_at'],
                'size': data['size'],
                'description': data['description']
            }
        return None
    
    def get_releases(self):
        """Récupère les releases et leurs téléchargements"""
        url = f"{self.api_base}/repos/{self.repo_owner}/{self.repo_name}/releases"
        response = requests.get(url, headers=self.get_headers())
        
        if response.status_code == 200:
            releases = response.json()
            total_downloads = 0
            release_data = []
            
            for release in releases:
                downloads = 0
                assets = []
                
                for asset in release['assets']:
                    downloads += asset['download_count']
                    assets.append({
                        'name': asset['name'],
                        'downloads': asset['download_count'],
                        'size': asset['size']
                    })
                
                total_downloads += downloads
                release_data.append({
                    'tag': release['tag_name'],
                    'name': release['name'],
                    'downloads': downloads,
                    'assets': assets,
                    'created_at': release['created_at']
                })
            
            return {
                'total_downloads': total_downloads,
                'releases': release_data
            }
        return None
    
    def get_commit_stats(self):
        """Récupère les statistiques des commits"""
        # Statistiques des 30 derniers jours
        since = (datetime.now() - timedelta(days=30)).isoformat()
        url = f"{self.api_base}/repos/{self.repo_owner}/{self.repo_name}/commits"
        params = {'since': since}
        
        response = requests.get(url, headers=self.get_headers(), params=params)
        
        if response.status_code == 200:
            commits = response.json()
            return {
                'recent_commits': len(commits),
                'last_commit': commits[0]['commit']['author']['date'] if commits else None
            }
        return None
    
    def get_contributors(self):
        """Récupère la liste des contributeurs"""
        url = f"{self.api_base}/repos/{self.repo_owner}/{self.repo_name}/contributors"
        response = requests.get(url, headers=self.get_headers())
        
        if response.status_code == 200:
            contributors = response.json()
            return [{
                'username': c['login'],
                'contributions': c['contributions'],
                'avatar': c['avatar_url']
            } for c in contributors]
        return []
    
    def generate_badges(self):
        """Génère les badges pour le README"""
        repo_stats = self.get_repo_stats()
        releases = self.get_releases()
        
        if not repo_stats:
            return []
        
        badges = [
            f"[![Stars](https://img.shields.io/github/stars/{self.repo_owner}/{self.repo_name}?label=stars)](https://github.com/{self.repo_owner}/{self.repo_name}/stargazers)",
            f"[![Forks](https://img.shields.io/github/forks/{self.repo_owner}/{self.repo_name}?label=forks)](https://github.com/{self.repo_owner}/{self.repo_name}/network)",
            f"[![Issues](https://img.shields.io/github/issues/{self.repo_owner}/{self.repo_name}?label=issues)](https://github.com/{self.repo_owner}/{self.repo_name}/issues)"
        ]
        
        if releases:
            badges.append(f"[![Downloads](https://img.shields.io/github/downloads/{self.repo_owner}/{self.repo_name}/total?label=downloads)](https://github.com/{self.repo_owner}/{self.repo_name}/releases)")
        
        return badges
    
    def print_metrics(self):
        """Affiche toutes les métriques"""
        print("📊 MÉTRIQUES SENTINEL VOICE")
        print("=" * 50)
        
        # Statistiques du repository
        repo_stats = self.get_repo_stats()
        if repo_stats:
            print(f"\n🏠 REPOSITORY")
            print(f"  ⭐ Étoiles: {repo_stats['stars']}")
            print(f"  🍴 Forks: {repo_stats['forks']}")
            print(f"  👀 Watchers: {repo_stats['watchers']}")
            print(f"  🐛 Issues ouvertes: {repo_stats['open_issues']}")
            print(f"  💻 Langage principal: {repo_stats['language']}")
            print(f"  📅 Créé le: {repo_stats['created_at'][:10]}")
            print(f"  🔄 Dernière mise à jour: {repo_stats['updated_at'][:10]}")
        
        # Releases et téléchargements
        releases = self.get_releases()
        if releases:
            print(f"\n📦 RELEASES")
            print(f"  📥 Total téléchargements: {releases['total_downloads']}")
            print(f"  🏷️  Nombre de releases: {len(releases['releases'])}")
            
            print(f"\n  📋 Détail des releases:")
            for release in releases['releases'][:5]:  # 5 dernières
                print(f"    • {release['tag']}: {release['downloads']} téléchargements")
                for asset in release['assets']:
                    print(f"      - {asset['name']}: {asset['downloads']} dl")
        
        # Statistiques des commits
        commit_stats = self.get_commit_stats()
        if commit_stats:
            print(f"\n📝 ACTIVITÉ")
            print(f"  🔄 Commits (30j): {commit_stats['recent_commits']}")
            if commit_stats['last_commit']:
                print(f"  🕐 Dernier commit: {commit_stats['last_commit'][:10]}")
        
        # Contributeurs
        contributors = self.get_contributors()
        if contributors:
            print(f"\n👥 CONTRIBUTEURS")
            print(f"  👤 Nombre de contributeurs: {len(contributors)}")
            print(f"  🏆 Top 3:")
            for i, contributor in enumerate(contributors[:3], 1):
                print(f"    {i}. @{contributor['username']}: {contributor['contributions']} contributions")
        
        # Badges
        print(f"\n🏷️  BADGES POUR LE README")
        print("  Copiez ces badges dans votre README.md:")
        for badge in self.generate_badges():
            print(f"  {badge}")
    
    def save_metrics_json(self, filename="metrics.json"):
        """Sauvegarde les métriques en JSON"""
        data = {
            'timestamp': datetime.now().isoformat(),
            'repository': self.get_repo_stats(),
            'releases': self.get_releases(),
            'commits': self.get_commit_stats(),
            'contributors': self.get_contributors()
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Métriques sauvegardées dans {filename}")

def main():
    """Fonction principale"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Collecter les métriques Sentinel Voice')
    parser.add_argument('--save', action='store_true', help='Sauvegarder en JSON')
    parser.add_argument('--repo', default='hassan312-god/Sentinel', help='Repository (owner/repo)')
    
    args = parser.parse_args()
    
    owner, repo = args.repo.split('/')
    metrics = SentinelMetrics(owner, repo)
    
    metrics.print_metrics()
    
    if args.save:
        metrics.save_metrics_json()

if __name__ == "__main__":
    main() 