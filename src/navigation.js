window.addEventListener('DOMContentLoaded', navigator);
window.addEventListener('hashchange', navigator);

function navigator() {
    console.log({location});
    if (location.hash.startsWith('#movies')) {
        moviesPage();
    } else if (location.hash.startsWith('#search=')){
        searchPage();
    } else if (location.hash.startsWith('#series')) {
        seriesPage()
    } else if (location.hash.startsWith('#directors')) {
        directorsPage()
    } else if (location.hash.startsWith('#now-playing')) {
        nowPlayingPage()
    } else if (location.hash.startsWith('#top-rated-movies')) {
        topRatedMoviesPage()
    } else if (location.hash.startsWith('#on-air')) {
        onAirPage()
    } else if (location.hash.startsWith('#top-rated-series')) {
        topRatedMoviesPage()
    } else {
        homePage()
    }
}

function homePage(){
    getCategories();
    getAsideCategories();
    getNowPlayingMoviePreview();
    getTopRatedMoviesPreview();
    getOnAirSeriesPreview();
    getTopRatedSeriesPreview();
}

function moviesPage(){
    console.log('Movies page');
}

function seriesPage(){
    console.log('Series page');
}

function directorsPage(){
    console.log('Directors page');
}

function nowPlayingPage(){
    console.log('Now playing page');
}

function topRatedMoviesPage(){
    console.log('Top rated movies page');
}

function onAirPage(){
    console.log('On air page');
}

function topRatedSeriesPage(){
    console.log('Top rated series page');
}

function searchPage(){
    console.log('Searching something');
}