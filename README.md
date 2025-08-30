# Movie App

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

## Description

Le Movie App est une application web dynamique et moderne conçue pour explorer et filtrer les 250 meilleurs films d'IMDB. Elle offre une interface élégante et intuitive permettant aux utilisateurs de rechercher des films par titre, de filtrer par genre et par note.

## What's New?

- **Refonte de l'interface utilisateur :** L'application a été entièrement repensée avec un design plus moderne et épuré.
- **Amélioration des cartes de films :** Les cartes de films ont un nouveau look avec une meilleure présentation des informations.
- **En-tête amélioré :** L'en-tête est maintenant fixe et contient la barre de recherche et les filtres pour un accès facile.
- **Responsivité accrue :** Le layout a été optimisé pour une expérience utilisateur exceptionnelle sur toutes les tailles d'écran.

## Fonctionnalités

*   **Liste des 250 meilleurs films IMDB :** Parcourez une liste soigneusement sélectionnée des films les mieux notés sur IMDB.
*   **Fonctionnalité de recherche avancée :** Trouvez rapidement des films grâce à une barre de recherche complète.
*   **Filtrage par évaluation :** Affinez votre recherche en filtrant les films en fonction de leur évaluation IMDB.
*   **Filtrage par genre :** Découvrez des films par genre grâce à des tags de genre interactifs.
*   **Bande-annonce en un clic :** Visionnez la bande-annonce de n'importe quel film directement dans l'application.
*   **Design moderne et réactif :** Profitez d'une expérience utilisateur fluide et optimisée sur tous les appareils.
*   **Infinite Scroll :** Chargez plus de films en faisant simplement défiler la page.

## Technologies Employées

*   **Frontend :**
    *   **HTML5 :** Langage de balisage standard pour la structuration du contenu web.
    *   **CSS3 :** Langage de feuille de style pour la conception et le style de l'application.
    *   **JavaScript (ES6+) :** Langage de programmation principal pour les fonctionnalités interactives.
*   **Outils de Développement :**
    *   **Vite :** Un outil de build rapide pour les projets web modernes.
    *   **npm :** Utilisé pour la gestion des dépendances.
*   **API & Bibliothèques :**
    *   **TMDb API :** Pour récupérer les données des films.
    *   **Axios :** Pour effectuer les requêtes HTTP vers l'API TMDb.
    *   **Vercel Analytics :** Pour le suivi de l'utilisation de l'application.

## Compétences Acquises

Ce projet a permis de développer et de renforcer les compétences suivantes :

*   **Développement Front-end :** Maîtrise de HTML5, CSS3 et JavaScript (ES6+) pour la création d'applications web interactives.
*   **Intégration d'API :** Utilisation de l'API RESTful de TMDb pour récupérer et afficher des données de manière asynchrone avec Axios.
*   **Manipulation du DOM :** Création et mise à jour dynamique de l'interface utilisateur en fonction des interactions de l'utilisateur et des données de l'API.
*   **Environnement de Développement Moderne :** Configuration et utilisation de Vite pour un développement rapide et efficace.
*   **Contrôle de Version :** Utilisation de Git et GitHub pour le suivi des modifications, la gestion des branches et la collaboration.
*   **Responsive Design :** Conception d'interfaces qui s'adaptent à différentes tailles d'écran, des mobiles aux ordinateurs de bureau.
*   **Accessibilité Web :** Implémentation de fonctionnalités pour améliorer l'accessibilité de l'application.
*   **UI/UX Design :** Application des principes de base de la conception d'interface et d'expérience utilisateur pour créer une application esthétique et facile à utiliser.

## Installation

Pour configurer et exécuter ce projet localement, suivez ces étapes.

### Prérequis

*   Node.js (version LTS recommandée)
*   npm (inclus avec Node.js)

### Étapes

1.  **Cloner le dépôt :**
    ```bash
    git clone https://github.com/khadimflash/movie_rating_app.git
    ```
2.  **Naviguer vers le répertoire du projet :**
    ```bash
    cd movie_rating_app
    ```
3.  **Installer les dépendances :**
    ```bash
    npm install
    ```

### Configuration de la clé API

Ce projet utilise l'API The Movie Database (TMDb). Vous devez obtenir votre propre clé API.

1.  Inscrivez-vous sur le [site web de TMDb](https://www.themoviedb.org/documentation/api) pour obtenir une clé API.
2.  Créez un fichier `.env` à la racine de votre projet.
3.  Ajoutez votre clé API au fichier `.env` :
    ```
    VITE_API_KEY=VOTRE_CLE_API_TMDB
    ```

## Utilisation

Pour exécuter l'application en mode développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173/`.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à forker le projet et à créer une pull request.

## Licence

Distribué sous la licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## Contact

Khadim Gning - [gningkhadim23@gmail.com](mailto:gningkhadim23@gmail.com) - [https://github.com/khadimflash](https://github.com/khadimflash)

Lien du projet : [https://github.com/khadimflash/movie_rating_app](https://github.com/khadimflash/movie_rating_app)

---

### Application déployée

Découvrez l'application déployée en ligne ici : [https://movie-rating-app-peach.vercel.app/](https://movie-rating-app-peach.vercel.app/)