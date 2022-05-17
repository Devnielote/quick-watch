const API_KEY = `fd75c02e14fc4dd119fe233811614da7`;
const API_GENRES = `https://api.themoviedb.org/3//genre/movie/list?api_key=${API_KEY}`;
const API_NOWPLAYINGMOVIES = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
const API_TOPMOVIES = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
const API_ONAIRSERIES = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`
const API_TOPRATEDSERIES = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
const API_IMAGE_REQUEST = (imgId) => `https://image.tmdb.org/t/p/w500/${imgId}`;