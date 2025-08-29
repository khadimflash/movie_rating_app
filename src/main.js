import './style.css';
import axios from 'axios';
import { API_URL, IMG_URL, GENRE_URL, SEARCH_URL, DISCOVER_URL, API_KEY } from './constant.js';
import { debouncing } from './utils.js';
import { inject } from "@vercel/analytics";
import { app, searchInput, ratingSelect, tagsEl, modal, closeModalBtn, modalContent, trailerContainer, loader, clearFiltersBtn, scrollToTopBtn } from './dom-elements.js';
import { PLACEHOLDER_IMAGE_URL, CSS_CLASSES } from './ui-constants.js';

inject();

const genreMap = new Map();
let selectedGenres = [];
let selectedRating = '';
let page = 1;
let isLoading = false;

// --- Loader Functions ---
const showLoader = () => {
    loader.style.display = 'block';
};

const hideLoader = () => {
    loader.style.display = 'none';
};

// --- API Functions ---
const getGenres = async (url = GENRE_URL) => {
    try {
        const response = await axios.get(url);
        response.data.genres.forEach(genre => {
            genreMap.set(genre.id, genre.name);
        });
        displayGenres(response.data.genres);
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
};

const getMovies = async (url, page = 1) => {
    if (isLoading) return;
    isLoading = true;
    showLoader();
    try {
        const response = await axios.get(`${url}&page=${page}`);
        const movies = response.data.results;
        displayMovies(movies, page === 1);
    } catch (error) {
        console.error("Error fetching movies:", error);
        app.innerHTML = '<p class="error">Failed to fetch movies. Please try again later.</p>';
    } finally {
        hideLoader();
        isLoading = false;
    }
};

// --- DOM Manipulation ---
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

const displayMovies = (movies, clear = true) => {
    if (clear) {
        app.innerHTML = '';
    }

    if (movies.length === 0 && clear) {
        app.innerHTML = '<p class="no-results">No movies found.</p>';
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
        movieCard.addEventListener('click', () => openTrailerModal(id));
        app.appendChild(movieCard);

        if (index === movies.length - 1) {
            infiniteScrollObserver.observe(movieCard);
        }
    });
};

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

const clearFilters = () => {
    selectedGenres = [];
    selectedRating = '';
    searchInput.value = '';
    ratingSelect.value = '';
    highlightSelectedTags();
    handleFilter();
};

// --- Modal Functions ---
const openTrailerModal = async (movieId) => {
    showLoader();
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
        const videos = response.data.results;
        const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

        if (trailer) {
            trailerContainer.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${trailer.key}?autoplay=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>`;
        } else {
            trailerContainer.innerHTML = '<p class="no-results">No trailer found for this movie.</p>';
        }
        modal.style.display = 'block';
    } catch (error) {
        console.error("Error fetching trailer:", error);
        trailerContainer.innerHTML = '<p class="error">Failed to fetch trailer. Please try again later.</p>';
        modal.style.display = 'block';
    } finally {
        hideLoader();
    }
};

const closeModal = () => {
    modal.style.display = 'none';
    trailerContainer.innerHTML = ''; // Clear the trailer
};

// --- Scroll to Top ---
const handleScroll = () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};


// --- Initialization ---
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