/*************
 1. To get the config data like image base urls
 https://api.themoviedb.org/3/configuration?api_key=<APIKEY>

 2. To fetch a list of movies based on a keyword
 https://api.themoviedb.org/3/search/movie?api_key=<APIKEY>&query=<keyword>

 3. To fetch more details about a movie
 https://api.themoviedb.org/3/movie/<movie-id>?api_key=<APIKEY>508943
 *************/

const APIKEY = '0497a560599e4b1196149db7ecbc29bb'; //TMDB api key
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;

//grab base image
let getConfig = () => {
    let url = "".concat(baseURL, 'configuration?api_key=', APIKEY);
    fetch(url)
        .then((result) => {return result.json();})
        .then((data) => {
            baseImageURL = data.images.secure_base_url;
            configData = data.images;
            console.log('images:', data);
            getPopularMovies(data);
        })
        .catch(function (err) {
            alert(err);
        });
}

//grab list of popular movies
let getPopularMovies = (images) => {
    let url = ''.concat(baseURL, 'movie/popular?api_key=', APIKEY, '&language=en-US');
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.log('data:', data);
            let titles = "";
            for(let i = 0; i < data.results.length; i++){
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[9.75rem] shrink-0 snap-start flex-col items-center justify-center p-2";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img class="mt-2 w-full" src="${images.images.secure_base_url + images.images.poster_sizes[4] + data.results[i].poster_path}" alt="${data.results[i].title}">
                    <button x-bind="focusableWhenVisible" class="px-4 py-2 text-sm">
                        Do Something
                    </button>`;
                document.querySelector(".popular-movies").appendChild(li);
            }
        });
}

//grab list of popular movies
let getComedyMovies = (images) => {
    // https://api.themoviedb.org/3/discover/movie?api_key=0497a560599e4b1196149db7ecbc29bb&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&without_genres=18%2C27&with_watch_monetization_types=flatrate
    let url = ''.concat(baseURL, 'discover/movie/popular?api_key=', APIKEY, '&language=en-US');
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.log('data:', data);
            let titles = "";
            for(let i = 0; i < data.results.length; i++){
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[9.75rem] shrink-0 snap-start flex-col items-center justify-center p-2";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img class="mt-2 w-full" src="${images.images.secure_base_url + images.images.poster_sizes[4] + data.results[i].poster_path}" alt="${data.results[i].title}">
                    <button x-bind="focusableWhenVisible" class="px-4 py-2 text-sm">
                        Do Something
                    </button>`;
                document.querySelector(".popular-movies").appendChild(li);
            }
        });
}


document.addEventListener('DOMContentLoaded', getConfig);