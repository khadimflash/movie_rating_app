# Movie App

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

## Description

Le Movie App est une application web dynamique conçue pour explorer et filtrer les 250 meilleurs films d'IMDB. Elle offre une interface intuitive permettant aux utilisateurs de rechercher des films par titre, genre ou nom, et d'appliquer des filtres basés sur les évaluations IMDB.

## Fonctionnalités

*   **Liste des 250 meilleurs films IMDB :** Parcourez une liste soigneusement sélectionnée des films les mieux notés sur IMDB.
*   **Fonctionnalité de recherche avancée :** Trouvez rapidement des films grâce à une barre de recherche complète qui prend en charge les requêtes par titre, genre ou nom.
*   **Filtrage par évaluation :** Affinez votre recherche en filtrant les films en fonction de leur évaluation IMDB (par exemple, 7 et plus, 8 et plus).
*   **Filtrage par genre :** Découvrez des films par genre grâce à des tags de genre générés dynamiquement.
*   **Conception réactive :** Profitez d'une expérience utilisateur fluide et optimisée sur tous les appareils (ordinateurs de bureau, tablettes, mobiles).

## Technologies Employées

Ce projet est développé en utilisant les technologies suivantes :

*   **Frontend :**
    *   **HTML5 :** Langage de balisage standard pour la structuration du contenu web.
    *   **CSS3 :** Langage de feuille de style pour la conception et le style de l'application.
    *   **JavaScript (ES6+) :** Langage de programmation principal pour les fonctionnalités interactives et la manipulation dynamique du contenu.
*   **Outils de Développement :**
    *   **Vite :** Un outil de build rapide et léger pour les projets web modernes, offrant un démarrage rapide et un rechargement à chaud instantané.
    *   **npm (Node Package Manager) :** Utilisé pour la gestion des dépendances du projet.
*   **API Externe :**
    *   **TMDb API (The Movie Database) :** Utilisée pour récupérer les données des films, les images et les informations connexes.

## Installation

Pour configurer et exécuter ce projet localement, suivez ces étapes simples.

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

*   Node.js (version LTS recommandée)
*   npm (généralement inclus avec Node.js)

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

Ce projet utilise l'API The Movie Database (TMDb). Vous devez obtenir votre propre clé API et la configurer :

1.  Rendez-vous sur le [site web de TMDb](https://www.themoviedb.org/documentation/api) et inscrivez-vous pour obtenir une clé API.
2.  Créez un fichier nommé `.env` à la racine de votre projet (dans le même répertoire que `package.json`).
3.  Ajoutez votre clé API au fichier `.env` au format suivant :
    ```
    VITE_API_KEY=VOTRE_CLE_API_TMDB
    ```
    Remplacez `VOTRE_CLE_API_TMDB` par votre véritable clé API.

## Utilisation

Pour exécuter l'application en mode développement :

```bash
npm run dev
```

Cela démarrera le serveur de développement local, et vous pourrez accéder à l'application dans votre navigateur, généralement à l'adresse `http://localhost:5173/`.

## Contribution

Si vous avez une suggestion qui pourrait améliorer ce projet, veuillez forker le dépôt et créer une pull request. Vous pouvez également simplement ouvrir une issue avec le tag "enhancement".
N'oubliez pas de donner une étoile au projet ! Merci encore !

1.  Forkez le projet.
2.  Créez votre branche de fonctionnalité (`git checkout -b feature/NomDeVotreFonctionnalite`).
3.  Commitez vos modifications (`git commit -m 'feat: Ajout d'une nouvelle fonctionnalité'`).
4.  Poussez vers la branche (`git push origin feature/NomDeVotreFonctionnalite`).
5.  Ouvrez une Pull Request.

## Licence

Distribué sous la licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## Contact

Khadim Gning - [gningkhadim23@gmail.com/ https://github.com/khadimflash]

Lien du projet : [https://github.com/khadimflash/movie_rating_app](https://github.com/khadimflash/movie_rating_app)

---

### Application déployée

Découvrez l'application déployée en ligne ici : [https://movie-rating-app-peach.vercel.app/](https://movie-rating-app-peach.vercel.app/)