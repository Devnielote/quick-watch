async function getNowPlayingMoviePreview() {
    const trendingContainer = document.querySelector('#trending-container');
    const res = await fetch(API_NOWPLAYINGMOVIES);
    if(res.status !==200){
        console.log(`Ha habido un error con tu solicitud: ${res.status}`)
    } else {
        const data = await res.json();
        const movie = data.results;
        console.log(data.results);
        const generateMovie = movie.forEach(movie => {
            const trendingMovie = document.createElement('div');
            trendingMovie.classList = 'this-month__movie'
            const movieImg = document.createElement('img');
            movieImg.src = `${API_IMAGE_REQUEST(movie.poster_path)}`;
            movieImg.alt = `${movie.title}`
            const infoContainer = document.createElement('div');
            infoContainer.classList = 'video__info'
            const infoName = document.createElement('div');
            infoName.classList = 'movie__name'
            const textContainer = document.createElement('p');
            const nameText = document.createTextNode(`${movie.title}`);
            textContainer.append(nameText);
            infoName.append(textContainer);
            const ratingContainer = document.createElement('div');
            ratingContainer.classList = 'movie_rating';
            const starIcon = document.createElement('img');
            starIcon.src = './styles/assets/start-flaticon.png';
            starIcon.style.width = '20px';
            const rating = document.createElement('span');
            const ratingNumbers = document.createTextNode(`${movie.vote_average}`);
            rating.append(ratingNumbers);
            ratingContainer.append(starIcon,rating);
            infoContainer.append(infoName,ratingContainer);
            trendingMovie.append(movieImg,infoContainer);
            trendingContainer.append(trendingMovie);
        });
    }
}

async function getTopRatedMoviesPreview() {
    const topRatedContainer = document.querySelector('#top-rated');
    const res = await fetch(API_TOPMOVIES);
    if(res.status !==200){
        console.log(`Ha habido un error con tu solicitud: ${res.status}`)
    } else {
        const data = await res.json();
        const movie = data.results;
        console.log(data.results);
        const generateMovie = movie.forEach(movie => {
            const trendingMovie = document.createElement('div');
            trendingMovie.classList = 'this-month__movie'
            const movieImg = document.createElement('img');
            movieImg.src = `${API_IMAGE_REQUEST(movie.poster_path)}`;
            movieImg.alt = `${movie.title}`
            const infoContainer = document.createElement('div');
            infoContainer.classList = 'video__info'
            const infoName = document.createElement('div');
            infoName.classList = 'movie__name'
            const textContainer = document.createElement('p');
            const nameText = document.createTextNode(`${movie.title}`);
            textContainer.append(nameText);
            infoName.append(textContainer);
            const ratingContainer = document.createElement('div');
            ratingContainer.classList = 'movie_rating';
            const starIcon = document.createElement('img');
            starIcon.src = './styles/assets/start-flaticon.png';
            starIcon.style.width = '20px';
            const rating = document.createElement('span');
            const ratingNumbers = document.createTextNode(`${movie.vote_average}`);
            rating.append(ratingNumbers);
            ratingContainer.append(starIcon,rating);
            infoContainer.append(infoName,ratingContainer);
            trendingMovie.append(movieImg,infoContainer);
            topRatedContainer.append(trendingMovie);
        });
    }
}
async function getOnAirSeriesPreview() {
    const topRatedContainer = document.querySelector('#on-air');
    const res = await fetch(API_ONAIRSERIES);
    if(res.status !==200){
        console.log(`Ha habido un error con tu solicitud: ${res.status}`)
    } else {
        const data = await res.json();
        const movie = data.results;
        console.log(data.results);
        const generateMovie = movie.forEach(movie => {
            const trendingMovie = document.createElement('div');
            trendingMovie.classList = 'this-month__movie'
            const movieImg = document.createElement('img');
            movieImg.src = `${API_IMAGE_REQUEST(movie.poster_path)}`;
            movieImg.alt = `${movie.title}`
            const infoContainer = document.createElement('div');
            infoContainer.classList = 'video__info'
            const infoName = document.createElement('div');
            infoName.classList = 'movie__name'
            const textContainer = document.createElement('p');
            const nameText = document.createTextNode(`${movie.name}`);
            textContainer.append(nameText);
            infoName.append(textContainer);
            const ratingContainer = document.createElement('div');
            ratingContainer.classList = 'movie_rating';
            const starIcon = document.createElement('img');
            starIcon.src = './styles/assets/start-flaticon.png';
            starIcon.style.width = '20px';
            const rating = document.createElement('span');
            const ratingNumbers = document.createTextNode(`${movie.vote_average}`);
            rating.append(ratingNumbers);
            ratingContainer.append(starIcon,rating);
            infoContainer.append(infoName,ratingContainer);
            trendingMovie.append(movieImg,infoContainer);
            topRatedContainer.append(trendingMovie);
        });
    }
}
async function getTopRatedSeriesPreview() {
    const topRatedContainer = document.querySelector('#top-rated-series');
    const res = await fetch(API_TOPRATEDSERIES);
    if(res.status !==200){
        console.log(`Ha habido un error con tu solicitud: ${res.status}`)
    } else {
        const data = await res.json();
        const movie = data.results;
        console.log(data.results);
        const generateMovie = movie.forEach(movie => {
            const trendingMovie = document.createElement('div');
            trendingMovie.classList = 'this-month__movie'
            const movieImg = document.createElement('img');
            movieImg.src = `${API_IMAGE_REQUEST(movie.poster_path)}`;
            movieImg.alt = `${movie.title}`
            const infoContainer = document.createElement('div');
            infoContainer.classList = 'video__info'
            const infoName = document.createElement('div');
            infoName.classList = 'movie__name'
            const textContainer = document.createElement('p');
            const nameText = document.createTextNode(`${movie.name}`);
            textContainer.append(nameText);
            infoName.append(textContainer);
            const ratingContainer = document.createElement('div');
            ratingContainer.classList = 'movie_rating';
            const starIcon = document.createElement('img');
            starIcon.src = './styles/assets/start-flaticon.png';
            starIcon.style.width = '20px';
            const rating = document.createElement('span');
            const ratingNumbers = document.createTextNode(`${movie.vote_average}`);
            rating.append(ratingNumbers);
            ratingContainer.append(starIcon,rating);
            infoContainer.append(infoName,ratingContainer);
            trendingMovie.append(movieImg,infoContainer);
            topRatedContainer.append(trendingMovie);
        });
    }
}
async function getCategories() {
    const categoriesContainer = document.querySelector('#categories-container');
    const res = await fetch(API_GENRES);
    if(res.status !==200){
        console.log(`Ha habido un error con tu solicitud: ${res.status}`)
    } else {
        const data = await res.json();
        const genres = data.genres;
        console.log(genres);
        const generateMovie = genres.forEach(genre => {
            const li = document.createElement('li');
            li.classList = 'categorie';
            const a = document.createElement('a');
            const genreName = document.createTextNode(`${genre.name}`);
            a.append(genreName);
            li.append(a);
            categoriesContainer.append(li);
        });
    }
}
async function getAsideCategories() {
    const asideContainer = document.querySelector('#aside-categories');
    const res = await fetch(API_GENRES);
    if(res.status !==200){
        console.log(`Ha habido un error con tu solicitud: ${res.status}`)
    } else {
        const data = await res.json();
        const genres = data.genres;
        console.log(genres);
        const generateMovie = genres.forEach(genre => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            const genreName = document.createTextNode(`${genre.name}`);
            a.append(genreName);
            li.append(a);
            asideContainer.append(li);
        });
    }
}

getCategories();
getAsideCategories();
getNowPlayingMoviePreview();
getTopRatedMoviesPreview();
getOnAirSeriesPreview();
getTopRatedSeriesPreview()