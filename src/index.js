const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});

//Utils
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entrie) => {
        if(entrie.isIntersecting){
            const url = entrie.target.getAttribute('data-imgurl');
            entrie.target.setAttribute('src', url );
        }
    });
});

//Sections generators
function createGenre(genres,container) {

    container.innerHTML = '';
    
    genres.forEach(genre => {
        const li = document.createElement('li');
        li.classList = 'categorie';
        const a = document.createElement('a');
        const genreName = document.createTextNode(`${genre.name}`);
        a.addEventListener('click', () => {
            location.hash = `#category=${genre.id}-${genre.name}`
        })
        a.append(genreName);
        li.append(a);
        container.append(li);
    })
}

function createMedias(medias, container, {lazyLoad = false, clean = false} = {}){

    if(clean) {
        container.innerHTML = '';
    };
    
    medias.forEach(media => {
        const mediaContainer = document.createElement('div');
        mediaContainer.addEventListener('click', () => {
            location.hash = `movie=${media.id}`;
            getMoviebById(media.id);
        });
        mediaContainer.classList = 'genericMedia__container'    //'this-month__movie'
        mediaContainer.id = 'single-media-container';
        const mediaImg = document.createElement('img');
        // movieImg.src = `${API_IMAGE_REQUEST(media.poster_path)}`;
        // movieImg.alt = `${media.title}`;
        mediaImg.setAttribute('alt', media.title);
        mediaImg.setAttribute(
            lazyLoad ? 'data-imgUrl': 'src',
            API_IMAGE_REQUEST(media.poster_path));

        mediaImg.addEventListener('error', () => {
            mediaImg.setAttribute('src', `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Ferror-document-icon-vector-id1060550172%3Fk%3D6%26m%3D1060550172%26s%3D612x612%26w%3D0%26h%3DgdWxz8H1C8PaxEKF_ItZfo_S-cbQsxC415_n5v9irvs%3D&f=1&nofb=1`);
        });

        if(lazyLoad){
            lazyLoader.observe(mediaImg);
        }
    
        const infoContainer = document.createElement('div');
        infoContainer.classList = 'video__info'
        const infoName = document.createElement('div');
        infoName.classList = 'media__name'
        const textContainer = document.createElement('p');
        let nameText;
        if(media.title){
            nameText = document.createTextNode(`${media.title}`);
        } else {
            nameText = document.createTextNode(`${media.name}`)
        }
        textContainer.append(nameText);
        infoName.append(textContainer);
        const ratingContainer = document.createElement('div');
        const starIcon = document.createElement('img');
        starIcon.src = './styles/assets/start-flaticon.png';
        starIcon.style.width = '20px';
        const rating = document.createElement('span');
        const ratingNumbers = document.createTextNode(`${media.vote_average}`);
        rating.append(ratingNumbers);
        ratingContainer.append(starIcon,rating);
        infoContainer.append(infoName,ratingContainer);
        mediaContainer.append(mediaImg,infoContainer);
        container.append(mediaContainer);
    })
};

//API calls

async function getNowPlayingMoviesPreview() {
    const { data } = await api('movie/now_playing',
    {
        params: {
            region: 'US',
            page,
        }
    });
    
        const movies = data.results;
        createMedias(movies,nowPlayingMoviesContainer, {lazyLoad:true, clean:true} );
    
}

async function getTopRatedMoviesPreview() {
    const { data } = await api('movie/top_rated',
    {
        params: {
            region: 'US',
            page,
        }
    });
   
        const movies = data.results;
        createMedias(movies,topRatedMoviesContainer,{lazyLoad:true, clean:true});
    
}

async function getOnAirSeriesPreview() {
    const {data} = await api('tv/popular');

        const series = data.results;
        createMedias(series,onAirSeriesContainer,{lazyLoad:true, clean:true});
}

async function getTopRatedSeriesPreview() {
    const {data} = await api('tv/top_rated',
    {
        params: {
            region: 'US',
            page,
        }
    });

        const series = data.results;
        createMedias(series,topRatedSeriesContainer,{lazyLoad:true, clean:true});
}

async function getCategories() {
    const {data} = await api('genre/movie/list');

        const genres = data.genres;
        createGenre(genres,mobileCategoriesContainer)
}

async function getAsideCategories() {
    const {data} = await api('genre/movie/list');

        const genres = data.genres;
        createGenre(genres,desktopCategoriesContainer);
};

async function getMoviesByCategory(id){
    const createContainer = document.createElement('div');
    createContainer.classList = 'movie-preview__container';

    singleCategoryView.innerHTML = '';

    const { data } = await api(`discover/movie`,{
        params: {
            with_genres: id,
            page,
        },
    });
    const movies = data.results;
    movies.forEach(movie => {
        const div = document.createElement('div');
        div.classList = 'categorie-movie__preview';
        div.addEventListener('click', () => {
            location.hash = `movie=${movie.id}`;
            getMoviebById(movie.id);
        });
        const mediaImg = document.createElement('img');
        // mediaImg.src = `${API_IMAGE_REQUEST(movie.poster_path)}`;
        mediaImg.setAttribute('alt', movie.title);
        mediaImg.setAttribute('data-imgUrl', API_IMAGE_REQUEST(movie.poster_path));
        mediaImg.addEventListener('error', () => {
            mediaImg.setAttribute('src', `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Ferror-document-icon-vector-id1060550172%3Fk%3D6%26m%3D1060550172%26s%3D612x612%26w%3D0%26h%3DgdWxz8H1C8PaxEKF_ItZfo_S-cbQsxC415_n5v9irvs%3D&f=1&nofb=1`);
            });

            lazyLoader.observe(mediaImg);
        
        const mediaInfo = document.createElement('div');
        mediaInfo.classList = 'video__info';
        const mediaName = document.createElement('div');
        mediaName.classList = 'movie__name';
        const p = document.createElement('p');
        const text = document.createTextNode(`${movie.original_title}`);
        p.append(text);
        mediaName.append(p);
        mediaInfo.append(mediaName);
        div.append(mediaImg,mediaInfo);
        createContainer.append(div);
    })
    singleCategoryView.append(createContainer);
    const btnContainer = document.createElement('div');
    btnContainer.className = 'btnContainer';
    const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'Load more';
    btnContainer.appendChild(btnLoadMore)
    singleCategoryView.append(btnContainer);
};

async function getMoviesBySearch(query){
    resultsContainer.innerHTML = "";
    const createContainer = document.createElement('div');
    createContainer.classList = 'movie-preview__container';

    const { data } = await api(`search/movie`,{
        params: {
            query,
        },
    });

    const movies = data.results;
    movies.forEach(movie => {
        const div = document.createElement('div');
        div.classList = 'categorie-movie__preview';
        div.addEventListener('click', () => {
            location.hash = `movie=${movie.id}`;
            getMoviebById(movie.id);
        })
        const mediaImg = document.createElement('img');
        // mediaImg.src = `${API_IMAGE_REQUEST(movie.poster_path)}`;
        mediaImg.setAttribute('alt', movie.title);
        mediaImg.setAttribute('data-imgUrl', API_IMAGE_REQUEST(movie.poster_path));
        mediaImg.addEventListener('error', () => {
            mediaImg.setAttribute('src', `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Ferror-document-icon-vector-id1060550172%3Fk%3D6%26m%3D1060550172%26s%3D612x612%26w%3D0%26h%3DgdWxz8H1C8PaxEKF_ItZfo_S-cbQsxC415_n5v9irvs%3D&f=1&nofb=1`);
            });

        lazyLoader.observe(mediaImg);
        
        const mediaInfo = document.createElement('div');
        mediaInfo.classList = 'video__info';
        const mediaName = document.createElement('div');
        mediaName.classList = 'movie__name';
        const p = document.createElement('p');
        const text = document.createTextNode(`${movie.original_title}`);
        p.append(text);
        mediaName.append(p);
        mediaInfo.append(mediaName);
        div.append(mediaImg,mediaInfo);
        createContainer.append(div);
    })
    resultsContainer.append(createContainer);
}

async function getMoviebById(movieId){
    const { data } = await api(`movie/${movieId}`);
    singleMediaView.innerHTML = '';
    const generateMovieDetails = 
        headerContainer.style.backgroundImage = `url(${API_IMAGE_REQUEST(data.poster_path)})`;
        const mediaTitleContainer = document.createElement('div');
        mediaTitleContainer.className = 'media__title';
        const mediaTitle = document.createElement('p');
        const p = document.createTextNode(`${data.original_title}`);
        mediaTitle.append(p);
        const videoInfo = document.createElement('div');
        videoInfo.classList.add('video__info--noMargin');
        const movieRating = document.createElement('div');
        movieRating.className = 'movie_rating';
        const starImg = document.createElement('img');
        starImg.src = './styles/assets/start-flaticon.png';
        starImg.style.width = '20px';
        const span = document.createElement('span');
        const rating = document.createTextNode(`${data.vote_average}`);
        span.append(rating);
        movieRating.append(starImg,span)
        videoInfo.append(movieRating)
        mediaTitleContainer.append(mediaTitle,videoInfo);

        const mediaInfoContainer = document.createElement('div');
        mediaInfoContainer.className = 'media__info';
        const mediaDescription = document.createElement('p');
        const descriptionText = document.createTextNode(`${data.overview}`);
        mediaDescription.append(descriptionText);
        const mediaGenres = document.createElement('div');
        mediaGenres.className = 'media__genres';
        data.genres.forEach(genre => {
            const mediaGenre = document.createElement('div');
            mediaGenre.className = 'media__genre';
            const span = document.createElement('span');
            const text = document.createTextNode(`${genre.name}`);
            span.append(text);
            mediaGenre.append(span);
            mediaGenres.append(mediaGenre);
        });

        getSimilarMovies(data.id);
        mediaInfoContainer.append(mediaDescription,mediaGenres);
        singleMediaView.append(mediaTitleContainer,mediaInfoContainer);
    
};

async function getSerieById(serieId){
    const { data } = await api(`/tv/${serieId}`);
    singleMediaView.innerHTML = '';
    console.log(data);
    const generateMovieDetails = 
        headerContainer.style.backgroundImage = `url(${API_IMAGE_REQUEST(data.poster_path)})`;
        const mediaTitleContainer = document.createElement('div');
        mediaTitleContainer.className = 'media__title';
        const mediaTitle = document.createElement('p');
        const p = document.createTextNode(`${data.name}`);
        mediaTitle.append(p);
        const videoInfo = document.createElement('div');
        videoInfo.classList.add('video__info--noMargin');
        const movieRating = document.createElement('div');
        movieRating.className = 'movie_rating';
        const starImg = document.createElement('img');
        starImg.src = './styles/assets/start-flaticon.png';
        starImg.style.width = '20px';
        const span = document.createElement('span');
        const rating = document.createTextNode(`${data.vote_average}`);
        span.append(rating);
        movieRating.append(starImg,span)
        videoInfo.append(movieRating)
        mediaTitleContainer.append(mediaTitle,videoInfo);

        const mediaInfoContainer = document.createElement('div');
        mediaInfoContainer.className = 'media__info';
        const mediaDescription = document.createElement('p');
        const descriptionText = document.createTextNode(`${data.overview}`);
        mediaDescription.append(descriptionText);
        const mediaGenres = document.createElement('div');
        mediaGenres.className = 'media__genres';
        data.genres.forEach(genre => {
            const mediaGenre = document.createElement('div');
            mediaGenre.className = 'media__genre';
            const span = document.createElement('span');
            const text = document.createTextNode(`${genre.name}`);
            span.append(text);
            mediaGenre.append(span);
            mediaGenres.append(mediaGenre);
        });

        getSimilarSeries(data.id);
        mediaInfoContainer.append(mediaDescription,mediaGenres);
        singleMediaView.append(mediaTitleContainer,mediaInfoContainer);
}

async function getSimilarMovies(movieId){
    const { data } = await api(`movie/${movieId}/recommendations`);
    console.log( data );
    relatedMediasContainer.innerHTML = '';
    const span = document.createElement('span');
    const spanText = document.createTextNode('Related to this');
    span.appendChild(spanText);
    const div = document.createElement('div');
    div.className = '--carousel';
    relatedMediasContainer.append(span,div);
    data.results.forEach(media => {
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'this-month__movie';
        mediaContainer.addEventListener('click', () => {
            location.hash = `movie=${media.id}`;
            getMoviebById(media.id);
        })
        const mediaImg = document.createElement('img');
        // mediaImg.src = `${API_IMAGE_REQUEST(media.poster_path)}`
        mediaImg.setAttribute('alt', media.title);
        mediaImg.setAttribute('data-imgUrl', API_IMAGE_REQUEST(media.poster_path));
        mediaImg.addEventListener('error', () => {
            mediaImg.setAttribute('src', `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Ferror-document-icon-vector-id1060550172%3Fk%3D6%26m%3D1060550172%26s%3D612x612%26w%3D0%26h%3DgdWxz8H1C8PaxEKF_ItZfo_S-cbQsxC415_n5v9irvs%3D&f=1&nofb=1`);
            });

        lazyLoader.observe(mediaImg);
        mediaContainer.appendChild(mediaImg);
        div.append(mediaContainer);
    })
    
}

async function getSimilarSeries(movieId){
    const { data } = await api(`tv/${movieId}/similar`);
    console.log( data );
    relatedMediasContainer.innerHTML = '';
    const span = document.createElement('span');
    const spanText = document.createTextNode('Related to this');
    span.appendChild(spanText);
    const div = document.createElement('div');
    div.className = '--carousel';
    relatedMediasContainer.append(span,div);
    data.results.forEach(media => {
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'this-month__movie';
        const mediaImg = document.createElement('img');
        mediaImg.src = `${API_IMAGE_REQUEST(media.poster_path)}`
        mediaContainer.appendChild(mediaImg);
        div.append(mediaContainer);
    })

}