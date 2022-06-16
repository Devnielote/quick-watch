let page = 1; //Por defecto los request que utilicen paginación retornaran la página 1.

searchBtn.addEventListener('click', () => {
    location.hash = `search=${searchFormInput.value.trim()}`
});

backBtn.addEventListener('click', () => {
    location.hash = '';
})

window.addEventListener('DOMContentLoaded', navigator);
window.addEventListener('hashchange', navigator);


function navigator() {
    searchInput.value = '';
    if (location.hash.startsWith('#movies')) {
        moviesPage();
    } else if (location.hash.startsWith('#search=')){
        searchPageResults();
    } else if (location.hash.startsWith('#series')) {
        seriesPage()
    } else if (location.hash.startsWith('#directors')) {
        directorsPage()
    } else if (location.hash.startsWith('#category=')) {
        singleGenrePage()
    } else if (location.hash.startsWith('#movie=')) {
        singleMediaDetails(true);
    } else if(location.hash.startsWith('#serie=')) {
        singleMediaDetails(false);
    } else if (location.hash.startsWith('#on-air')) {
        onAirPage()
    } else if (location.hash.startsWith('#top-rated-series')) {
        topRatedMoviesPage()
    } else if (location.hash.startsWith('#nowPlayingMovies')) {
        nowPlayingMoviesFullPage();
    } else if (location.hash.startsWith('#topRatedMovies')) {
        topRatedMoviesFullPage();
    } else if (location.hash.startsWith('#onAirSeries')) {
        onAirSeriesFullPage();
    } else if(location.hash.startsWith('#topRatedSeries')) {
        topRatedSeriesFullPage();
    } else {
        homePage()
    }
}


function homePage(){
    homeSections.classList.remove('disabled');
    headerContainer.classList.add('disabled');
    headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    resultsContainer.classList.add('disabled');
    fullMediaPageSection.classList.add('disabled');
    singleMediaView.classList.add('disabled');
    relatedMediasContainer.classList.add('disabled');
    getCategories();
    getAsideCategories();
    getNowPlayingMoviesPreview();
    getTopRatedMoviesPreview();
    getOnAirSeriesPreview();
    getTopRatedSeriesPreview();
}

function searchPageResults(){
    getAsideCategories();
    getCategories();
    console.log('Searching something');
    headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    singleCategoryView.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    singleMediaView.classList.add('disabled');
    homeSections.classList.add('disabled');
    resultsContainer.classList.remove('disabled');
    relatedMediasContainer.classList.add('disabled');

    const [_, query] = location.hash.split('=');
    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(`Results from: ${query}`);
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);
    getMoviesBySearch(query);
}

function singleGenrePage(){
    getAsideCategories();
    getCategories();
    headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    desktopCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    resultsContainer.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    singleCategoryMediaPreview.classList.add('disabled');
    singleMediaView.classList.add('disabled');
    homeSections.classList.add('disabled');
    relatedMediasContainer.classList.add('disabled');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    const newName = categoryName.replace('%20', '');

    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(`${newName}`);
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);
    getMoviesByCategory(categoryId);
   
}

function singleMediaDetails(mediaTypeMovie){
    getAsideCategories();
    topNavContainer.classList.add('disabled');
    mobileCategoriesContainer.classList.add('disabled');
    searchBarSection.classList.add('disabled');
    resultsContainer.classList.add('disabled');
    headerContainer.classList.remove('disabled');
    fullMediaPageSection.classList.add('disabled');
    singleMediaView.classList.remove('disabled');
    homeSections.classList.add('disabled');
    relatedMediasContainer.classList.remove('disabled');
    const [_, movieId] = location.hash.split('=');
    if(mediaTypeMovie){
        getMoviebById(movieId);
    } else {
        getSerieById(movieId);
    }
}

function nowPlayingMoviesFullPage() {
    getAsideCategories();
    getCategories();
    getNowPlayingMoviesFullPage();
    headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    singleCategoryView.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    singleMediaView.classList.add('disabled');
    homeSections.classList.add('disabled');
    resultsContainer.classList.remove('disabled');
    relatedMediasContainer.classList.add('disabled');

    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(`Now playing movies`);
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);
}

function topRatedMoviesFullPage() {
    getAsideCategories();
    getCategories();
    getTopRatedMoviesFullPage();
    headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    singleCategoryView.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    singleMediaView.classList.add('disabled');
    homeSections.classList.add('disabled');
    resultsContainer.classList.remove('disabled');
    relatedMediasContainer.classList.add('disabled');

    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(`Top rated movies`);
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);  
}

function onAirSeriesFullPage() {
    getAsideCategories();
    getCategories();
    getOnAirSeriesFullPage();
    headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    singleCategoryView.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    singleMediaView.classList.add('disabled');
    homeSections.classList.add('disabled');
    resultsContainer.classList.remove('disabled');
    relatedMediasContainer.classList.add('disabled');

    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(`On air series`);
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);
}

function topRatedSeriesFullPage() {
    getAsideCategories();
    getCategories();
    getTopRatedSeriesFullPage();
    headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    singleCategoryView.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    singleMediaView.classList.add('disabled');
    homeSections.classList.add('disabled');
    resultsContainer.classList.remove('disabled');
    relatedMediasContainer.classList.add('disabled');

    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(`Top rated series`);
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);
}