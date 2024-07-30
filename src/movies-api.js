// movies-api.js

import axios from 'axios';

const API_KEY = '3d90b1702fc7399f17ce95b7105cf37e';
const BASE_URL = 'https://api.themoviedb.org/3';
const TRENDING_URL = `${BASE_URL}/trending/movie/day`; 
const SEARCH_URL = `${BASE_URL}/search/movie`;

// Функція для отримання трендових фільмів
export const fetchTrendingMovies = () => {
    return axios.get(TRENDING_URL, {
        params: {
            api_key: API_KEY
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error fetching trending movies:', error);
        throw error;
    });
};

// Функція для отримання деталей фільму
export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

// Функція для отримання акторського складу фільму
export const fetchMovieCast = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
            params: {
                api_key: API_KEY,
            },
        });
        return response.data.cast;
    } catch (error) {
        console.error('Error fetching movie cast:', error);
        throw error;
    }
};

// Функція для отримання рецензій на фільм
export const fetchMovieReviews = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
            params: {
                api_key: API_KEY,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movie reviews:', error);
        throw error;
    }
};

// Функція для пошуку фільмів
export const searchMovies = async (query) => {
    try {
        const response = await axios.get(SEARCH_URL, {
            params: {
                api_key: API_KEY,
                query: query,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};
