// Clé d'API pour l'accès à The Movie Database (TMDb)
export const API_KEY = import.meta.env.VITE_API_KEY;

// URL de base pour récupérer les films les mieux notés
export const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;

// URL de base pour les images des films
export const IMG_URL = "https://image.tmdb.org/t/p/w500";

// URL pour récupérer la liste des genres de films
export const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

// URL pour rechercher des films
export const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

// URL pour découvrir des films avec des filtres
export const DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;