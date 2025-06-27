let lang = navigator.language;


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});

function likedMediaList() {
    //Devolver un array con las medias guardadas.
    const item = JSON.parse(localStorage.getItem('liked_medias')); // Si es la primera vez que se entrá a la app este item estará vacío, por lo que devolverá un null.
    let medias;

    if (item){
        medias = item;
    } else {
        medias = {};
    }
    return medias;
}

function likeMedia(media){
    favoritesMediasContainer.innerHTML = '';
    const likedMedias = likedMediaList();
    if(likedMedias[media.id]) {
        likedMedias[media.id] = undefined;
    } else {
       likedMedias[media.id] = media;
    }
    localStorage.setItem('liked_medias',JSON.stringify(likedMedias));
    getNowPlayingMoviesPreview();
    getTopRatedMoviesPreview();
    getOnAirSeriesPreview();
    getTopRatedSeriesPreview();
    getLikedMediasPreview();
    // if(location.hash.startsWith('#category')){
    //     page = 1;
    //     const [_, categoryData] = location.hash.split('=');
    //     const [categoryId, categoryName] = categoryData.split('-');
    //     getMoviesByCategory(categoryId);
    // } else if (location.hash.startsWith('#search')){
    //     page = 1;
    //     const [_, query] = location.hash.split('=');
    //     getMediasBySearch(query);
    // }
}

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
//TODO: Un generic section generator donde se guarden las medias que se llamen en base al hash. Así no dependo de varios containers, solo de uno en general
function createGenre(genres,container) {

    container.innerHTML = '';
    
    genres.forEach(genre => {
        const li = document.createElement('li');
        li.classList = 'categorie';
        const a = document.createElement('a');
        const genreName = document.createTextNode(`${genre.name}`);
        li.addEventListener('click', () => {
            location.hash = `#category=${genre.id}-${genre.name}`
        })
        a.append(genreName);
        li.append(a);
        container.append(li);
    })
}

function createMedias(medias, container, mediaTypeMovie, {lazyLoad = false, clean = false, } = {}){

    if(clean) {
        container.innerHTML = '';
    };

    if(medias.length == 0){
        const emptyListContainer = document.createElement('div');
        emptyListContainer.className = 'emptyList__container';
        const emptyListText = document.createElement('p');
        const text = document.createTextNode(`It seems that you haven't saved anything yet (´。＿。｀)`)
        emptyListText.appendChild(text);
        emptyListContainer.appendChild(emptyListText);
        container.appendChild(emptyListContainer);
    } else {
        medias.forEach(media => {
            const mediaContainer = document.createElement('div');
            mediaContainer.addEventListener('click', () => {
                if(media.first_air_date){
                    location.hash = `#serie=${media.id}`;
                } else {
                    location.hash = `#movie=${media.id}`
                }
            });
            mediaContainer.classList = 'genericMedia__container'
            mediaContainer.id = 'single-media-container';
            const mediaImg = document.createElement('img');
            mediaImg.setAttribute('alt', media.title);
            mediaImg.setAttribute(
                lazyLoad ? 'data-imgUrl': 'src',
                API_IMAGE_REQUEST(media.poster_path));
    
            mediaImg.addEventListener('error', () => {
                mediaImg.setAttribute('src', `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Ferror-document-icon-vector-id1060550172%3Fk%3D6%26m%3D1060550172%26s%3D612x612%26w%3D0%26h%3DgdWxz8H1C8PaxEKF_ItZfo_S-cbQsxC415_n5v9irvs%3D&f=1&nofb=1`);
            });
    
            const likeBtnContainer = document.createElement('div');
            const favoritesList = likedMediaList();
            if(favoritesList[media.id]){
                likeBtnContainer.className = 'likeBtn__container--liked'
            } else {
                likeBtnContainer.className = 'likeBtn__container';
            }
            likeBtnContainer.id = 'like-btn';
            likeBtnContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                // favoritesMediasContainer.innerHTML = '';
                likeBtnContainer.classList.toggle('likeBtn__container--liked');
                likeMedia(media); 
            });
            
            if(lazyLoad){
                lazyLoader.observe(mediaImg);
            };
        
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
            const ratingNumbers = document.createTextNode(`${Math.floor(media.vote_average)}`);
            rating.append(ratingNumbers);
            ratingContainer.append(starIcon,rating);
            infoContainer.append(infoName,ratingContainer);
            mediaContainer.append(mediaImg,likeBtnContainer,infoContainer);
            container.append(mediaContainer);
        });
    }
    
};

function createFullPageMedias(medias, container, mediaTypeMovie, {lazyLoad = false, clean = false, } = {}){
    if(clean) {
        container.innerHTML = '';
    };
    
    medias.forEach(media => {
        const mediaContainer = document.createElement('div');
        mediaContainer.addEventListener('click', () => {
            
            if(mediaTypeMovie){
                location.hash = `#movie=${media.id}`;
            } else if (mediaTypeMovie == false){
                location.hash = `#serie=${media.id}`
            }

        });

        mediaContainer.classList = 'genericMedia__container'
        mediaContainer.id = 'single-media-container';
        const mediaImg = document.createElement('img');
        mediaImg.setAttribute('alt', media.title);
        mediaImg.setAttribute(
            lazyLoad ? 'data-imgUrl': 'src',
            API_IMAGE_REQUEST(media.poster_path));

        mediaImg.addEventListener('error', () => {
            mediaImg.setAttribute('src', `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Ferror-document-icon-vector-id1060550172%3Fk%3D6%26m%3D1060550172%26s%3D612x612%26w%3D0%26h%3DgdWxz8H1C8PaxEKF_ItZfo_S-cbQsxC415_n5v9irvs%3D&f=1&nofb=1`);
        });

        const likeBtnContainer = document.createElement('div');
            const favoritesList = likedMediaList();
            if(favoritesList[media.id]){
                likeBtnContainer.className = 'fullPageLikeBtn__container--liked'
            } else {
                likeBtnContainer.className = 'fullPageLikeBtn__container';
            }
            likeBtnContainer.id = 'like-btn';
            likeBtnContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                // favoritesMediasContainer.innerHTML = '';
                likeBtnContainer.classList.toggle('fullPageLikeBtn__container--liked');
                likeMedia(media); 
            });

        if(lazyLoad){
            lazyLoader.observe(mediaImg);
        }
        mediaContainer.append(mediaImg,likeBtnContainer);
        container.append(mediaContainer);
    })
};


//TODO: Agregar contenedores y estilos especificos para cuando se detecten personas, diferenciar de directores y actores.
function multiSearchFullPageMedias(medias,container,{lazyLoad = false, clean = false,} = {}){
    if(clean) {
        container.innerHTML = '';
    };

        medias.forEach(media => {
            const mediaContainer = document.createElement('div');
            mediaContainer.addEventListener('click', () => {
                if(media.media_type == 'movie'){
                    location.hash = `#movie=${media.id}`;
                } else if (media.media_type == 'person') {
                    location.hash = `#person=${media.id}`
                    alert('Person details page in construction')
                } else if(media.media_type == 'tv') {
                    location.hash = `#serie=${media.id}`;
                }
            });
            
            mediaContainer.classList = 'genericMedia__container'
            mediaContainer.id = 'single-media-container';
            const mediaImg = document.createElement('img');
            mediaImg.setAttribute('alt', media.title);
            mediaImg.setAttribute(
                lazyLoad ? 'data-imgUrl': 'src',
                API_IMAGE_REQUEST(media.poster_path));
    
            mediaImg.addEventListener('error', () => {
                mediaImg.setAttribute('src', `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Ferror-document-icon-vector-id1060550172%3Fk%3D6%26m%3D1060550172%26s%3D612x612%26w%3D0%26h%3DgdWxz8H1C8PaxEKF_ItZfo_S-cbQsxC415_n5v9irvs%3D&f=1&nofb=1`);
            });

            const likeBtnContainer = document.createElement('div');
            const favoritesList = likedMediaList();
            if(favoritesList[media.id]){
                likeBtnContainer.className = 'fullPageLikeBtn__container--liked'
            } else {
                likeBtnContainer.className = 'fullPageLikeBtn__container';
            }
            likeBtnContainer.id = 'like-btn';
            likeBtnContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                // favoritesMediasContainer.innerHTML = '';
                likeBtnContainer.classList.toggle('fullPageLikeBtn__container--liked');
                likeMedia(media); 
            });
    
            if(lazyLoad){
                lazyLoader.observe(mediaImg);
            }
            mediaContainer.append(mediaImg,likeBtnContainer);
            container.append(mediaContainer);
        })

}



//API calls for home section
async function getCategories() {
    const {data} = await api('genre/movie/list', {
        params: {
            language: lang,
        }
    });

        const genres = data.genres;
        createGenre(genres,mobileCategoriesContainer)
}

async function getAsideCategories() {
    const {data} = await api('genre/movie/list', {
        params: {
            language: lang,
        }
    });

        const genres = data.genres;
        createGenre(genres,desktopCategoriesContainer);
};

async function getNowPlayingMoviesPreview() {
    const { data } = await api('movie/now_playing',
    {
        params: {
            region: 'US',
            page,
            language: lang,
        }
    });
    
        const movies = data.results;
        createMedias(movies,nowPlayingMoviesContainer,true, {lazyLoad:true, clean:true} );
}

async function getTopRatedMoviesPreview() {
    const { data } = await api('movie/top_rated',
    {
        params: {
            region: 'US',
            page,
            language: lang,
        }
    });
   
        const movies = data.results;
        createMedias(movies,topRatedMoviesContainer,true,{lazyLoad:true, clean:true});
    
}

async function getOnAirSeriesPreview() {
    const {data} = await api('tv/popular', {
        params: {
            language: lang,
        }
    });

        const series = data.results;
        createMedias(series,onAirSeriesContainer,false,{lazyLoad:true, clean:true});
}

async function getTopRatedSeriesPreview() {


    const {data} = await api('tv/top_rated',
    {
        params: {
            region: 'US',
            page,
            language: lang,
        }
    });

        const series = data.results;
        createMedias(series,topRatedSeriesContainer,false,{lazyLoad:true, clean:true});
}

async function getTopRatedSeriesPreview() {
    const {data} = await api('tv/top_rated',
    {
        params: {
            region: 'US',
            page,
            language: lang,
        }
    });

        const series = data.results;
        createMedias(series,topRatedSeriesContainer,false,{lazyLoad:true, clean:true});
}

function getLikedMediasPreview() {
    const likedMedias = likedMediaList();
    const mediasArray = Object.values(likedMedias);
    createMedias(mediasArray,favoritesMediasContainer,true,{lazyLoad: true, clean: true});
}

//API calls for full page section
async function getNowPlayingMoviesFullPage() {
    const { data } = await api('movie/now_playing',{
        params: {
            page,
            language: lang,
        }
    });
    const movies = data.results;
    maxPage = data.total_pages;
    createFullPageMedias(movies,fullMediaPageContainer,true, {lazyLoad:true, clean:true} );
}


async function getTopRatedMoviesFullPage() {
    const { data } = await api('movie/top_rated',
    {
        params: {
            region: 'US',
            page,
            language: lang,
        }
    });
   
        const movies = data.results;
        maxPage = data.total_pages;
        createFullPageMedias(movies,fullMediaPageContainer,true,{lazyLoad:true, clean:true});
}

async function getOnAirSeriesFullPage() {
    const {data} = await api('tv/popular', {
        params: {
            language: lang,
        }
    });

        const series = data.results;
        maxPage = data.total_pages;
        createFullPageMedias(series,fullMediaPageContainer,false,{lazyLoad:true, clean:true});
}


async function getTopRatedSeriesFullPage() {
    const {data} = await api('tv/top_rated',
    {
        params: {
            region: 'US',
            page,
            language: lang,
        }
    });

        const series = data.results;
        maxPage = data.total_pages;
        createFullPageMedias(series,fullMediaPageContainer,false,{lazyLoad:true, clean:true});
}

async function getMoviesByCategory(id){
    const { data } = await api(`discover/movie`,{
        params: {
            with_genres: id,
            page,
            language: lang,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;
    createFullPageMedias(movies,fullMediaPageContainer,true,{lazyLoad: true, clean: true});
};

//Api calls for infinite scrolling

async function getPaginatedPlayingNowMovies() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight,
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const y = window.scrollY;

    const pageIsNotMax = page < maxPage;

    if(scrollIsBottom && y >= scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('movie/now_playing', {
            params: {
                page,
                language: lang,
            }
        });

        const movies = data.results;
        createFullPageMedias(movies,fullMediaPageContainer,true,{lazyLoad: true, clean:false});
    };
}

async function getPaginatedTopRatedMovies() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight,
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

    const pageIsNotMax = page < maxPage;

    if(scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('movie/top_rated', {
            params: {
                page,
                language: lang,
            }
        });

        const movies = data.results;
        createFullPageMedias(movies,fullMediaPageContainer,true,{lazyLoad: true, clean:false});
    };
}

async function getPaginatedOnAirSeries() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight,
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

    const pageIsNotMax = page < maxPage;

    if(scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('tv/popular', {
            params: {
                page,
                language: lang,
            }
        });

        const movies = data.results;
        createFullPageMedias(movies,fullMediaPageContainer,false,{lazyLoad: true, clean:false});
    };
}

async function getPaginatedTopRatedSeries() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight,
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

    const pageIsNotMax = page < maxPage;

    if(scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('tv/top_rated', {
            params: {
                page,
                language: lang,
            }
        });

        const movies = data.results;
        createFullPageMedias(movies,fullMediaPageContainer,false,{lazyLoad: true, clean:false});
    };
}

function getPaginatedMoviesByGenre(categoryId) {
   return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight,
        } = document.documentElement;

        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

        const pageIsNotMax = page < maxPage;

        if(scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api(`discover/movie`,{
                params: {
                    with_genres: categoryId,
                    page,
                    language: lang,
                },
            });
            
            const movies = data.results;
            createFullPageMedias(movies,fullMediaPageContainer,true,{lazyLoad: true, clean:false});
        };
   }
}

function getPaginatedMoviesBySearch(query){
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight,
        } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    
        const pageIsNotMax = page < maxPage;
    
        if(scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api(`search/multi`,{
                params: {
                    query,
                    page,
                    language: lang,
                },
            });
            medias = data.results;
            console.log(data);
            multiSearchFullPageMedias(medias,fullMediaPageContainer,{lazyLoad:true,clean:false})
        };
    }
    
}

//TODO: Buscador para series, películas y directores (CHECK)
async function getMediasBySearch(query){
    const { data } = await api(`search/multi`,{
            params: {
                query,
                language: lang,
            },
        });
        medias = data.results;
        maxPage = data.total_pages;
        console.log(data);
        multiSearchFullPageMedias(medias,fullMediaPageContainer,{lazyLoad:true,clean:true})
}


//Api calls for single media details. 

//TODO: Función de media details debe detectar que tipo de media (serie, pelicula o director) se debe traer.

async function createSinglePageMedia(media, container, mediaType, {lazyLoad = false, clean = false, } = {}) {
    singleMediaDetailsBg.innerHTML = '';
    singleMediaDetailsInfo.innerHTML = '';
    if(mediaType == 'person') {
        credits  = await api(`/person/${mediaId}/combined_credits`);
        const generateSingleMediaDetails = 
    singleMediaDetailsBg.style.backgroundImage = `url(${API_IMAGE_REQUEST(media.profile_path)})`;
    const backArrowContainer = document.createElement('div');
    backArrowContainer.className = 'back-arrow';
    backArrowContainer.id = 'back-btn';
    const backArrowImg = document.createElement('img');
    backArrowImg.src = `./styles/assets/arrow-left.svg`;
    backArrowContainer.append(backArrowImg);
    backArrowContainer.addEventListener('click', () => {
        location.hash = '';
    })
    singleMediaDetailsBg.append(backArrowContainer);
    const mediaTitleContainer = document.createElement('div');
    mediaTitleContainer.className = 'singleMediaDetails__title';
    const mediaTitle = document.createElement('p');
    if(media.original_title){
         p = document.createTextNode(`${data.original_title}`);
    } else p = document.createTextNode(`${data.name}`);
        mediaTitle.append(p);
        mediaTitleContainer.append(mediaTitle);

        const mediaInfoContainer = document.createElement('div');
        mediaInfoContainer.className = 'media__info';
        const mediaDescription = document.createElement('p');
        const descriptionText = document.createTextNode(`${media.biography}`);
        mediaDescription.append(descriptionText);
        const mediaCredits = document.createElement('div');
        mediaCredits.className = 'media__genres';
        data.know_for_department.forEach(genre => {
            const mediaGenre = document.createElement('div');
            mediaGenre.className = 'media__genre';
            const span = document.createElement('span');
            const text = document.createTextNode(`${genre.name}`);
            span.append(text);
            mediaGenre.append(span);
            mediaGenres.append(mediaGenre);
        });

        // getSimilarMedias(media.id);
        singleMediaDetailsBg.append(mediaTitleContainer);
        singleMediaDetailsInfo.append(mediaDescription,mediaGenres);
        singleMediaDetailsContainer.append(mediaInfoContainer);
        getSimilarMedias(data.id);
    }
}

async function getMediaDetailsById(mediaId){
    singleMediaDetailsBg.innerHTML = '';
    singleMediaDetailsInfo.innerHTML = '';
    if(location.hash.startsWith('#movie=')){
        media = { data } = await api(`movie/${mediaId}`,
    {
        params: {
            language: lang,
        }
    });
    } else if (location.hash.startsWith('#serie=')) {
        media = { data } = await api(`/tv/${mediaId}`,
        {
            params: {
                language: lang,
            }
        });
    } else if(location.hash.startsWith('#person=')) {
        media = { data } = await api(`/person/${mediaId}`,
        {
            params: {
                language: lang,
            }
        });
    }
    const generateSingleMediaDetails = 
    singleMediaDetailsBg.style.backgroundImage = `url(${API_IMAGE_REQUEST(data.backdrop_path)})`;
    const backArrowContainer = document.createElement('div');
    backArrowContainer.className = 'back-arrow';
    backArrowContainer.id = 'back-btn';
    const backArrowImg = document.createElement('img');
    backArrowImg.src = `./styles/assets/arrow-left.svg`;
    backArrowContainer.append(backArrowImg);
    backArrowContainer.addEventListener('click', () => {
        location.hash = '';
    })
    singleMediaDetailsBg.append(backArrowContainer);
    const mediaTitleContainer = document.createElement('div');
    mediaTitleContainer.className = 'singleMediaDetails__title';
    const mediaTitle = document.createElement('p');
    if(data.original_title){
         p = document.createTextNode(`${data.title}`);
    } else p = document.createTextNode(`${data.name}`);
        mediaTitle.append(p);
        const videoInfo = document.createElement('div');
        videoInfo.classList.add('video__info--noMargin');
        const movieRating = document.createElement('div');
        movieRating.className = 'movie_rating';
        const starImg = document.createElement('img');
        starImg.src = './styles/assets/start-flaticon.png';
        starImg.style.width = '20px';
        const span = document.createElement('span');
        const rating = document.createTextNode(`${Math.floor(data.vote_average)}`);
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

        // getSimilarMedias(media.id);
        singleMediaDetailsBg.append(mediaTitleContainer);
        singleMediaDetailsInfo.append(mediaDescription,mediaGenres);
        singleMediaDetailsContainer.append(mediaInfoContainer);
        getSimilarMedias(data.id);
}

async function getSimilarMedias(mediaId){
    if(location.hash.startsWith('#movie=')){
        const { data  } = await api(`movie/${mediaId}/similar`,
        {
            params: {
                language: lang,
            }
        });
        const medias = data.results;
        createMedias(medias,relatedMediasContainer,true,{lazyLoad: true, clean: true});
    } else {
        const { data } = await api(`tv/${mediaId}/similar`,
        {
            params: {
                language: lang,
            }
        });
        const medias = data.results;
        createMedias(medias,relatedMediasContainer,false,{lazyLoad: true, clean: true});
    }
}

//TODO: Una única función para generar single media details page con similar medias incluido. (CHECK)
//TODO: Crear función de similar medias y agregarla al single medias section. (CHECK)
//TODO: Crear función para hacer request del cast y crew de cada single media detail que se llame.
