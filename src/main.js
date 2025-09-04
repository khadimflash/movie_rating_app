// Importation des modules et des constantes nécessaires
import './style.css';
import axios from 'axios';
import { API_URL, IMG_URL, GENRE_URL, SEARCH_URL, DISCOVER_URL, API_KEY } from './constant.js';
import { debouncing } from './utils.js';
import { inject } from "@vercel/analytics";
import { speedInsights } from "@vercel/speed-insights/vite"
import { app, searchInput, ratingSelect, tagsEl, modal, closeModalBtn, modalContent, trailerContainer, loader, clearFiltersBtn, scrollToTopBtn } from './dom-elements.js';
import { PLACEHOLDER_IMAGE_URL, CSS_CLASSES } from './ui-constants.js';

// Initialisation de Vercel Analytics et Speed Insights
inject();
speedInsights();

// Initialisation des variables globales
const genreMap = new Map();
let selectedGenres = [];
let selectedRating = '';
let page = 1;
let isLoading = false;

// --- Fonctions du chargeur ---
// Affiche l'indicateur de chargement
const showLoader = () => {
    loader.style.display = 'block';
};

// Masque l'indicateur de chargement
const hideLoader = () => {
    loader.style.display = 'none';
};

// --- Fonctions de l'API ---
// Récupère la liste des genres de films
const getGenres = async (url = GENRE_URL) => {
    try {
        const response = await axios.get(url);
        response.data.genres.forEach(genre => {
            genreMap.set(genre.id, genre.name);
        });
        displayGenres(response.data.genres);
    } catch (error) {
        console.error("Erreur lors de la récupération des genres:", error);
    }
};

// Récupère la liste des films
const getMovies = async (url, page = 1) => {
    if (isLoading) return;
    isLoading = true;
    showLoader();
    try {
        const response = await axios.get(`${url}&page=${page}`);
        const movies = response.data.results;
        displayMovies(movies, page === 1);
    } catch (error) {
        console.error("Erreur lors de la récupération des films:", error);
        app.innerHTML = '<p class="error">Échec de la récupération des films. Veuillez réessayer plus tard.</p>';
    } finally {
        hideLoader();
        isLoading = false;
    }
};

// --- Manipulation du DOM ---
// Affiche les genres de films
const displayGenres = (genres) => {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add(CSS_CLASSES.TAG);
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenres.includes(genre.id)) {
                selectedGenres = selectedGenres.filter(id => id !== genre.id);
            } else {
                selectedGenres.push(genre.id);
            }
            highlightSelectedTags();
            handleFilter();
        });
        tagsEl.appendChild(t);
    });
};

// Met en surbrillance les balises de genre sélectionnées
const highlightSelectedTags = () => {
    const tags = document.querySelectorAll('.' + CSS_CLASSES.TAG);
    tags.forEach(tag => {
        tag.classList.remove(CSS_CLASSES.HIGHLIGHT);
    });
    selectedGenres.forEach(id => {
        const tag = document.getElementById(id);
        if (tag) {
            tag.classList.add(CSS_CLASSES.HIGHLIGHT);
        }
    });
};

// Affiche les films
const displayMovies = (movies, clear = true) => {
    if (clear) {
        app.innerHTML = '';
    }

    if (movies.length === 0 && clear) {
        app.innerHTML = '<p class="no-results">Aucun film trouvé.</p>';
        return;
    }

    movies.forEach((movie, index) => {
        const { id, title, poster_path, vote_average, genre_ids } = movie;
        const movieGenres = genre_ids.map(id => genreMap.get(id)).filter(Boolean).join(', ');

        const movieCard = document.createElement('div');
        movieCard.classList.add(CSS_CLASSES.CARD, CSS_CLASSES.SHADOW, CSS_CLASSES.IN_VIEW);
        movieCard.dataset.genreIds = JSON.stringify(genre_ids);
        movieCard.dataset.vote = vote_average;
        movieCard.dataset.movieId = id;

        movieCard.innerHTML = `
            <div class="card-image-container">
                <img src="${poster_path ? IMG_URL + poster_path : PLACEHOLDER_IMAGE_URL}" alt="${title}" class="card-image">
            </div>
            <div class="movie-details">
                <p class="title">${title}</p>
                <p class="genre"><b>Genre:</b> ${movieGenres || 'N/A'}</p>
                <div class="ratings">
                    <div class="star-rating">
                        <span class="material-symbols-outlined">star</span>
                        <span>${(vote_average / 2).toFixed(1)}/5</span>
                    </div>
                    <p>${vote_average.toFixed(1)}</p>
                </div>
            </div>
        `;
        movieCard.addEventListener('click', () => openMovieDetailsModal(id));
        app.appendChild(movieCard);

        if (index === movies.length - 1) {
            infiniteScrollObserver.observe(movieCard);
        }
    });
};

// Gère la recherche de films
const handleSearch = async () => {
    page = 1;
    const query = searchInput.value.trim();
    if (query) {
        const url = `${SEARCH_URL}&query=${query}`;
        getMovies(url, page);
    } else {
        handleFilter();
    }
}

// Gère le filtrage des films
const handleFilter = () => {
    page = 1;
    let apiUrl = API_URL;
    if (selectedGenres.length > 0 || selectedRating !== '') {
        apiUrl = `${DISCOVER_URL}&with_genres=${selectedGenres.join(',')}`;
        if (selectedRating) {
            apiUrl += `&vote_average.gte=${selectedRating}`;
        }
    }
    getMovies(apiUrl, page);
}

// Efface les filtres
const clearFilters = () => {
    selectedGenres = [];
    selectedRating = '';
    searchInput.value = '';
    ratingSelect.value = '';
    highlightSelectedTags();
    handleFilter();
};

// --- Fonctions de la modale ---
// Ouvre la modale des détails du film
const openMovieDetailsModal = async (movieId) => {
    showLoader();
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`);
        const movie = response.data;
        displayMovieDetails(movie);
        modal.style.display = 'block';
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du film:", error);
        modalContent.innerHTML = '<p class="error">Échec de la récupération des détails du film. Veuillez réessayer plus tard.</p>';
        modal.style.display = 'block';
    } finally {
        hideLoader();
    }
};

// Affiche les détails du film dans la modale
const displayMovieDetails = (movie) => {
    const { title, overview, runtime, genres, videos } = movie;
    const trailer = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

    modalContent.innerHTML = `
        <span class="close-button" aria-label="Fermer la modale des détails du film">&times;</span>
        <div class="modal-grid">
            <div class="modal-image-container">
                <img src="${movie.poster_path ? IMG_URL + movie.poster_path : PLACEHOLDER_IMAGE_URL}" alt="${title}" class="modal-image">
            </div>
            <div class="modal-details">
                <h2 class="modal-title">${title}</h2>
                <p class="modal-description">${overview}</p>
                <p class="modal-info"><strong>Durée:</strong> ${runtime} minutes</p>
                <p class="modal-info"><strong>Genres:</strong> ${genres.map(genre => genre.name).join(', ')}</p>
            </div>
        </div>
        ${trailer ? `
            <div class="modal-trailer">
                <h3>Bande-annonce</h3>
                <iframe 
                    src="https://www.youtube.com/embed/${trailer.key}" 
                    frameborder="0" 
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        ` : ''}
    `;

    const closeModalBtn = modalContent.querySelector('.close-button');
    closeModalBtn.addEventListener('click', closeModal);
};

// Ferme la modale
const closeModal = () => {
    modal.style.display = 'none';
    modalContent.innerHTML = '';
};

// --- Défilement vers le haut ---
// Gère l'affichage du bouton de défilement vers le haut
const handleScroll = () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
};

// Fait défiler la page vers le haut
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};


// --- Initialisation ---
// Observe le défilement infini
const infiniteScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            page++;
            let url = API_URL;
            const query = searchInput.value.trim();
            if (query) {
                url = `${SEARCH_URL}&query=${query}`;
            } else if (selectedGenres.length > 0 || selectedRating !== '') {
                url = `${DISCOVER_URL}&with_genres=${selectedGenres.join(',')}`;
                if (selectedRating) {
                    url += `&vote_average.gte=${selectedRating}`;
                }
            }
            getMovies(url, page);
        }
    });
}, { threshold: 0.1 });

// Initialise l'application
async function init() {
    await getGenres(GENRE_URL);
    await getMovies(API_URL, page);
    searchInput.addEventListener("input", debouncing(handleSearch, 500));
    ratingSelect.addEventListener('change', (e) => {
        selectedRating = e.target.value;
        handleSearch();
    });
    clearFiltersBtn.addEventListener('click', clearFilters);
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('pointerup', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    modalContent.addEventListener('touchstart', (event) => {
        event.stopPropagation();
    });
    window.addEventListener('scroll', handleScroll);
    scrollToTopBtn.addEventListener('click', scrollToTop);
}

init();

// --- Accessibilité ---
// Configure l'accessibilité pour la modale
const setupAccessibility = () => {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modalFocusableElements = modal.querySelectorAll(focusableElements);
    const firstFocusableElement = modalFocusableElements[0];
    const lastFocusableElement = modalFocusableElements[modalFocusableElements.length - 1];

    const trapFocus = (e) => {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { // si la touche Maj est enfoncée pour la combinaison Maj + Tab
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // ajoute le focus au dernier élément focusable
                e.preventDefault();
            }
        } else { // si la touche Tab est enfoncée
            if (document.activeElement === lastFocusableElement) { // si le focus a atteint le dernier élément focusable, alors focus sur le premier élément focusable après avoir appuyé sur Tab
                firstFocusableElement.focus(); // ajoute le focus au premier élément focusable
                e.preventDefault();
            }
        }
    };

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            trapFocus(e);
        }
    });
};

setupAccessibility();