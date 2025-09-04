// L'élément principal de l'application où les films sont affichés
export const app = document.getElementById('app');

// Le champ de saisie pour la recherche de films
export const searchInput = document.querySelector('.input');

// Le menu déroulant pour sélectionner la note minimale des films
export const ratingSelect = document.querySelector('.rating-select');

// L'élément qui contient les balises de genre
export const tagsEl = document.getElementById('tags');

// La fenêtre modale pour afficher la bande-annonce du film
export const modal = document.getElementById('trailer-modal');

// Le contenu de la fenêtre modale
export const modalContent = document.querySelector('.modal-content');

// Le conteneur pour la bande-annonce du film
export const trailerContainer = document.getElementById('trailer-container');

// L'indicateur de chargement
export const loader = document.querySelector('.loader');

// Le bouton pour effacer les filtres
export const clearFiltersBtn = document.querySelector('.clear-filters-btn');

// Le bouton pour faire défiler vers le haut de la page
export const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');