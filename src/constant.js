export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
export const IMG_URL = "https://image.tmdb.org/t/p/w500";
export const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
export const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
export const DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;