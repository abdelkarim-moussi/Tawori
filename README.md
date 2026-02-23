## Tawori – Job Search Application

Présentation

JobFinder est une application web de recherche d'emploi développée en Single Page Application (SPA) avec Angular.
Elle permet aux utilisateurs de rechercher des offres d'emploi provenant d'APIs publiques internationales, de sauvegarder leurs offres favorites et de suivre leurs candidatures.

L'application utilise JSON Server pour simuler un backend REST et stocker les données utilisateurs.

Objectifs du projet

Le projet a pour objectifs :

Développer une SPA avec Angular 17+

Consommer des APIs REST publiques

Implémenter une authentification frontend

Simuler un backend avec JSON Server

Implémenter NgRx pour la gestion d'état

Sécuriser les routes avec AuthGuard

Créer une architecture Angular propre et maintenable

Implémenter une interface responsive

Stack Technique
Frontend

Angular 17+

TypeScript

RxJS

NgRx (gestion d'état)

Bootstrap ou TailwindCSS

Backend simulé

JSON Server

Concepts Angular utilisés

Components

Services

Dependency Injection

Routing

Guards

Lazy Loading

Reactive Forms / Template Forms

Pipes

HTTP Client

Observables RxJS

Parent / Child Components

Fonctionnalités principales
Authentification

Les utilisateurs peuvent :

Créer un compte

Se connecter

Modifier leur profil

Supprimer leur compte

Informations utilisateur :

Nom

Prénom

Email

Mot de passe

Fake Authentication

L'authentification est simulée côté frontend.

Processus :

Vérification email/password dans JSON Server

Si valide :

Utilisateur stocké dans :

sessionStorage ou

localStorage

Accès aux routes via AuthGuard

Routes protégées :

Favoris

Candidatures

Profil

⚠️ Cette authentification est une simulation destinée uniquement à un environnement pédagogique.

Recherche d'emplois

Accessible sans authentification.

Filtres obligatoires

Mot clé (titre du poste)

Localisation

Règles métier

Recherche uniquement sur le titre

Résultats triés par date décroissante

Loader pendant la recherche

Affichage

Pagination :

10 offres par page

Chaque offre affiche :

Titre

Entreprise

Localisation

Date

Description courte

Salaire (si disponible)

Actions disponibles :

Voir l'offre

Ajouter aux favoris

Suivre candidature

Les boutons favoris et candidatures sont visibles uniquement si l'utilisateur est connecté.

Gestion des Favoris

Disponible uniquement pour les utilisateurs authentifiés.

Fonctionnalités :

Ajouter aux favoris

Voir les favoris

Supprimer un favori

Règles métier :

Impossible d'ajouter deux fois la même offre

Indicateur visuel si l'offre est favorite

Gestion d'état :

NgRx Store

Structure JSON Server :

{
"id": 1,
"userId": 2,
"offerId": 101,
"title": "Angular Developer",
"company": "Company A",
"location": "Casablanca"
}
Suivi des candidatures

Disponible uniquement pour les utilisateurs connectés.

Fonctionnalités :

Ajouter candidature

Voir candidatures

Modifier statut

Ajouter notes

Supprimer candidature

Statuts

en_attente

accepté

refusé

Structure JSON Server :

{
"id": 1,
"userId": 2,
"offerId": "101",
"apiSource": "adzuna",
"title": "Angular Developer",
"company": "Company A",
"location": "Casablanca",
"url": "https://...",
"status": "en_attente",
"notes": "",
"dateAdded": "2026-02-10T10:30:00Z"
}
APIs utilisées

L'application consomme au minimum une API publique :

https://job-finder-api-nine.vercel.app/

Possibilité d'utiliser plusieurs APIs simultanément.

Gestion des données
JSON Server

Stocke :

Users

FavoritesOffers

Applications

Storage navigateur

Stocke :

Utilisateur connecté

Choix possible :

sessionStorage → session temporaire

localStorage → session persistante

Architecture du projet
src/
├── app/
│ ├── components/
│ ├── features/
│ ├── services/
│ ├── guards/
│ ├── types/
│ ├── store/
│ └── shared/
Sécurité

Sécurité implémentée :

AuthGuard

Routes protégées

Fake authentication

Validation des formulaires

Sécurité simulée :

Pas de JWT

Pas de backend réel

Gestion des erreurs

Validation des formulaires

Messages d'erreur utilisateur

Gestion erreurs HTTP

Intercepteurs HTTP (optionnel)

Responsive Design

Compatible :

Mobile

Tablette

Desktop

Installation

1. Cloner le projet
   git clone https://github.com/abdelkarim-moussi/Tawori.git
2. Installer les dépendances
   npm install
3. Lancer JSON Server
   npx json-server --watch db.json
4. Lancer l'application Angular
   ng serve

Application disponible sur :

http://localhost:4200
Structure db.json
users
favoritesOffers
applications
Tests réalisés

Tests manuels effectués :

Authentification

Inscription utilisateur

Connexion utilisateur

Déconnexion

Protection des routes

Favoris

Ajout favoris

Suppression favoris

Non duplication

Candidatures

Ajout candidature

Modification statut

Suppression candidature

Recherche

Recherche par titre

Filtre localisation

Pagination

Loader

Améliorations possibles

Backend Spring Boot ou NodeJS

Authentification JWT

Upload CV

Notifications

Tests unitaires

Docker

PWA

Recherche avancée
