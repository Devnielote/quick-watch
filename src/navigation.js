let page = 1; //Por defecto los request que utilicen paginación retornaran la página 1.
let maxPage;
let infiniteScroll;
//TODO: Back button que no te regrese directamente al home.

searchBtn.addEventListener('click', () => {
    location.hash = `search=${searchFormInput.value.trim()}`
});

language.addEventListener('change', (event) => {
    lang = event.target.value;
    homePage();
})

function showMenu() {
    inputCheckbox.checked = true;
}

window.addEventListener('resize', () => {
    if(screen.width >= 1024 && inputCheckbox.checked == false){
        showMenu()
    }
})

window.addEventListener('DOMContentLoaded', navigator);
window.addEventListener('DOMContentLoaded', () => {
    if(screen.width >= 1024 && inputCheckbox.checked == false){
        showMenu()
    }
})
window.addEventListener('hashchange', navigator);
window.addEventListener('scroll', infiniteScroll, false);
document.body.addEventListener('touchmove',infiniteScroll, false);


function navigator() {
    if(infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, { passive: false});
        document.body.removeEventListener('touchmove',infiniteScroll, {passive: false});
        infiniteScroll = undefined;
    }
    page = 1;
    maxPage = undefined;
    searchFormInput.value = '';

    if (location.hash.startsWith('#search=')) {
        searchPageResults();
    } else if (location.hash.startsWith('#category=')) {
        singleGenrePage()
    } else if (location.hash.startsWith('#movie=')) {
        singleMediaDetails();
    } else if(location.hash.startsWith('#serie=')) {
        singleMediaDetails();
    }else if (location.hash.startsWith('#person=')){
        singleMediaDetails();
    } else if (location.hash.startsWith('#on-air')) {
        onAirPage()
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

    if(infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false});
        document.body.addEventListener('touchmove',infiniteScroll,{passive: false});
    }
}

function homePage(){
    homeSections.classList.remove('disabled');
    // // headerContainer.classList.add('disabled');
    // // headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    // // resultsContainer.classList.add('disabled');
    fullMediaPageSection.classList.add('disabled');
    // // singleMediaView.classList.add('disabled');
    singleMediaDetailsContainer.classList.add('disabled');
    // // relatedMediasContainer.classList.add('disabled');
    getCategories();
    getAsideCategories();
    getNowPlayingMoviesPreview();
    getTopRatedMoviesPreview();
    getOnAirSeriesPreview();
    getTopRatedSeriesPreview();
    getLikedMediasPreview();
}

function searchPageResults(){
    getAsideCategories();
    getCategories();
    // // headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    // singleCategoryView.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    fullMediaPageContainer.classList.remove('disabled');
    // // singleMediaView.classList.add('disabled');
    singleMediaDetailsContainer.classList.add('disabled');
    homeSections.classList.add('disabled');
    // // resultsContainer.classList.remove('disabled');
    // // relatedMediasContainer.classList.add('disabled');
    
    const [_, query] = location.hash.split('=');
    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(`Results from: ${query}`);
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);
    getMediasBySearch(query);
    infiniteScroll = getPaginatedMoviesBySearch(query);
}

function singleGenrePage(){
    getAsideCategories();
    getCategories();
    // // headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    desktopCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    // resultsContainer.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    // singleCategoryMediaPreview.classList.add('disabled');
    // // singleMediaView.classList.add('disabled');
    singleMediaDetailsContainer.classList.add('disabled');
    homeSections.classList.add('disabled');
    // // relatedMediasContainer.classList.add('disabled');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    const newName = categoryName.replace('%20', '');

    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(decodeURI(newName));
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);
    getMoviesByCategory(categoryId);
    infiniteScroll = getPaginatedMoviesByGenre(categoryId);
}

function singleMediaDetails(){
    getAsideCategories();
    topNavContainer.classList.add('disabled');
    mobileCategoriesContainer.classList.add('disabled');
    searchBarSection.classList.add('disabled');
    // // resultsContainer.classList.add('disabled');
    // // headerContainer.classList.remove('disabled');
    fullMediaPageSection.classList.add('disabled');
    // // singleMediaView.classList.remove('disabled');
    singleMediaDetailsContainer.classList.remove('disabled');
    homeSections.classList.add('disabled');
    // // relatedMediasContainer.classList.remove('disabled');
    const [mediaType, movieId] = location.hash.split('=');    getMediaDetailsById(movieId);
}

function nowPlayingMoviesFullPage() {
    getAsideCategories();
    getCategories();
    // headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    // singleCategoryView.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    // singleMediaView.classList.add('disabled');
    singleMediaDetailsContainer.classList.add('disabled');
    homeSections.classList.add('disabled');
    // resultsContainer.classList.remove('disabled');
    // relatedMediasContainer.classList.add('disabled');
    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(`Now playing movies`);
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);
    getNowPlayingMoviesFullPage();
    infiniteScroll = getPaginatedPlayingNowMovies;
}

function topRatedMoviesFullPage() {
    getAsideCategories();
    getCategories();
    // headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    // singleCategoryView.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    // singleMediaView.classList.add('disabled');
    singleMediaDetailsContainer.classList.add('disabled');
    homeSections.classList.add('disabled');
    // resultsContainer.classList.remove('disabled');
    // relatedMediasContainer.classList.add('disabled');
    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(`Top rated movies`);
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);  
    getTopRatedMoviesFullPage();
    infiniteScroll = getPaginatedTopRatedMovies;
}

function onAirSeriesFullPage() {
    getAsideCategories();
    getCategories();
    // headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    // singleCategoryView.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    // singleMediaView.classList.add('disabled');
    singleMediaDetailsContainer.classList.add('disabled');
    homeSections.classList.add('disabled');
    // resultsContainer.classList.remove('disabled');
    // relatedMediasContainer.classList.add('disabled');
    
    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(`On air series`);
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);
    getOnAirSeriesFullPage();
    infiniteScroll = getPaginatedOnAirSeries;
}

function topRatedSeriesFullPage() {
    getAsideCategories();
    getCategories();
    // headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    // singleCategoryView.classList.add('disabled');
    fullMediaPageSection.classList.remove('disabled');
    // singleMediaView.classList.add('disabled');
    singleMediaDetailsContainer.classList.add('disabled');
    homeSections.classList.add('disabled');
    // resultsContainer.classList.remove('disabled');
    // relatedMediasContainer.classList.add('disabled');
    
    fullMediaPageTitleContainer.innerHTML = '';
    const fullMediaPageTitle = document.createElement('h2');
    const fullMediaPageTitleText = document.createTextNode(`Top rated series`);
    fullMediaPageTitle.append(fullMediaPageTitleText);
    fullMediaPageTitleContainer.append(fullMediaPageTitle);
    getTopRatedSeriesFullPage();
    infiniteScroll = getPaginatedTopRatedSeries;

}