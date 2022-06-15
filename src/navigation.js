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
    if (location.hash.startsWith('#movies')) {
        moviesPage();
    } else if (location.hash.startsWith('#search=')){
        searchPageResults();
    } else if (location.hash.startsWith('#series')) {
        seriesPage()
    } else if (location.hash.startsWith('#directors')) {
        directorsPage()
    } else if (location.hash.startsWith('#category=')) {
        singleCategoryPage()
    } else if (location.hash.startsWith('#movie=')) {
        singleMediaDetails()
    } else if (location.hash.startsWith('#on-air')) {
        onAirPage()
    } else if (location.hash.startsWith('#top-rated-series')) {
        topRatedMoviesPage()
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
    singleCategoryView.classList.add('disabled');
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
    console.log('Searching something');
    headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    singleCategoryView.classList.add('disabled');
    singleMediaView.classList.add('disabled');
    homeSections.classList.add('disabled');
    resultsContainer.classList.remove('disabled');
    relatedMediasContainer.classList.add('disabled');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}

function singleCategoryPage(){
    getAsideCategories();
    getCategories();
    headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    desktopCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    resultsContainer.classList.add('disabled');
    singleCategoryView.classList.remove('disabled');
    singleCategoryMediaPreview.classList.add('disabled');
    singleMediaView.classList.add('disabled');
    homeSections.classList.add('disabled');
    relatedMediasContainer.classList.add('disabled');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    const newName = categoryName.replace('%20', '');
    
    getMoviesByCategory(categoryId);
    const titleContainer = document.createElement('div');
    titleContainer.classList = 'category-title';
    titleContainer.id = 'category-title';
    const actualCategory = document.createElement('h2');
    const h2Text = document.createTextNode(`${newName}`);
    actualCategory.append(h2Text);
    titleContainer.append(actualCategory);
    singleCategoryView.append(titleContainer);
}

function singleMediaDetails(){
    getAsideCategories();
    console.log('Single media details');
    topNavContainer.classList.add('disabled');
    mobileCategoriesContainer.classList.add('disabled');
    searchBarSection.classList.add('disabled');
    resultsContainer.classList.add('disabled');
    headerContainer.classList.remove('disabled');
    singleCategoryView.classList.add('disabled');
    singleMediaView.classList.remove('disabled');
    homeSections.classList.add('disabled');
    relatedMediasContainer.classList.remove('disabled');
    const [_, movieId] = location.hash.split('=');
    // getMovie(movieId);
}

function fullMediasPage(){
    getAsideCategories();
    headerContainer.classList.add('disabled');
    topNavContainer.classList.remove('disabled');
    mobileCategoriesContainer.classList.remove('disabled');
    desktopCategoriesContainer.classList.remove('disabled');
    searchBarSection.classList.remove('disabled');
    resultsContainer.classList.add('disabled');
    singleCategoryView.classList.remove('disabled');
    singleCategoryMediaPreview.classList.add('disabled');
    singleMediaView.classList.add('disabled');
    homeSections.classList.remove('disabled');
}
