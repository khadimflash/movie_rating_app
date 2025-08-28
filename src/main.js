import './style.css';
import axios from 'axios';
import { API_URL, IMG_URL, GENRE_URL, SEARCH_URL, DISCOVER_URL, API_KEY } from './constant.js';
import { debouncing } from './utils.js';
import { inject } from "@vercel/analytics";

inject();

const app = document.getElementById('app');
const searchInput = document.querySelector('.input');
const ratingSelect = document.querySelector('.rating-select');
const tagsEl = document.getElementById('tags');
const modal = document.getElementById('trailer-modal');
const closeModalBtn = document.querySelector('.close-button');
const trailerContainer = document.getElementById('trailer-container');

const genreMap = new Map();
let selectedGenres = [];
let selectedRating = '';

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

const getMovies = async (url) => {
    try {
        const response = await axios.get(url);
        const movies = response.data.results;
        displayMovies(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
        app.innerHTML = '<p class="error">Failed to fetch movies. Please try again later.</p>';
    }
};

// --- DOM Manipulation ---
const displayGenres = (genres) => {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenres.includes(genre.id)) {
                selectedGenres = selectedGenres.filter(id => id !== genre.id);
            } else {
                selectedGenres.push(genre.id);
            }
            highlightSelectedTags();
            getAndDisplayMovies();
        });
        tagsEl.appendChild(t);
    });
};

const highlightSelectedTags = () => {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight');
    });
    selectedGenres.forEach(id => {
        const tag = document.getElementById(id);
        if (tag) {
            tag.classList.add('highlight');
        }
    });
};

const displayMovies = (movies) => {
    app.innerHTML = ''; // Clear previous results

    if (movies.length === 0) {
        app.innerHTML = '<p class="no-results">No movies found.</p>';
        return;
    }

    movies.forEach((movie) => {
        const { id, title, poster_path, vote_average, genre_ids } = movie;
        const movieGenres = genre_ids.map(id => genreMap.get(id)).filter(Boolean).join(', ');

        const movieCard = document.createElement('div');
        movieCard.classList.add('card', 'shadow');
        movieCard.dataset.genreIds = JSON.stringify(genre_ids);
        movieCard.dataset.vote = vote_average;
        movieCard.dataset.movieId = id;

        movieCard.innerHTML = `
            <div class="card-image-container">
                <img src="${poster_path ? IMG_URL + poster_path : 'http://via.placeholder.com/500x750'}" alt="${title}" class="card-image">
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
        cardObserver.observe(movieCard);
        app.appendChild(movieCard);
    });
};

const getAndDisplayMovies = async () => {
    let url;
    const query = searchInput.value.trim();

    if (query) {
        url = `${SEARCH_URL}&query=${query}`;
        try {
            const response = await axios.get(url);
            const movies = response.data.results;
            const filteredMovies = movies.filter(movie => {
                const vote = parseFloat(movie.vote_average);
                const genreIds = movie.genre_ids;

                const ratingMatch = !selectedRating || vote >= selectedRating;
                const genreMatch = selectedGenres.length === 0 || selectedGenres.every(id => genreIds.includes(id));

                return ratingMatch && genreMatch;
            });
            displayMovies(filteredMovies);
        } catch (error) {
            console.error("Error fetching and filtering movies:", error);
            app.innerHTML = '<p class="error">Failed to fetch movies. Please try again later.</p>';
        }
        return;
    } else {
        let apiUrl = API_URL;
        if(selectedGenres.length > 0 || selectedRating !==''){
            apiUrl = `${DISCOVER_URL}&with_genres=${selectedGenres.join(',')}`;
            if (selectedRating) {
                apiUrl += `&vote_average.gte=${selectedRating}`;
            }
        }
        getMovies(apiUrl)
    }
}

// --- Modal Functions ---
const openTrailerModal = async (movieId) => {
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
    }
};

const closeModal = () => {
    modal.style.display = 'none';
    trailerContainer.innerHTML = ''; // Clear the trailer
};


// --- Initialization ---
const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

async function init() {
    await getGenres(GENRE_URL);
    await getMovies(API_URL);
    searchInput.addEventListener("input", debouncing(getAndDisplayMovies, 500));
    ratingSelect.addEventListener('change', (e) => {
        selectedRating = e.target.value;
        getAndDisplayMovies();
    });
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

init();