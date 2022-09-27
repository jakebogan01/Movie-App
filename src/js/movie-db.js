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

let getConfig = () => {
    let url = "".concat(baseURL, 'configuration?api_key=', APIKEY);
    fetch(url)
        .then((result) => {return result.json();})
        .then((data) => {
            baseImageURL = data.images.secure_base_url;
            configData = data.images;
            getMovies(data);
        })
        .catch(function (err) {
            alert(err);
        });
}

let getMovies = (images) => {
    let url = ''.concat(baseURL, 'movie/popular?api_key=', APIKEY, '&language=en-US');
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.log('images:', images);
            console.log('data:', data);
            let titles = "";
            // for(let i = 0; i < data.results.length; i++){
            //     let li = document.createElement("LI");
            //     li.innerHTML = `<li>${data.results[i].title}</li>`;
            //     document.querySelector(".output").appendChild(li);
            // }
            getMainMovie();
        })
}

let getMainMovie = () => {
    let url = ''.concat(baseURL, 'movie/508943?api_key=', APIKEY);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.log('luca:', data);
        })
}

document.addEventListener('DOMContentLoaded', getConfig);