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
            //     let bind = document.createAttribute("x-bind");
            //     bind.value = "disableNextAndPreviousButtons";
            //     let className = document.createAttribute("className");
            //     className.value = "flex w-1/3 shrink-0 snap-start flex-col items-center justify-center p-2";
            //     li.setAttributeNode(bind);
            //     li.setAttributeNode(className);
            //     li.innerHTML =
            //         `<li>${data.results[i].title}</li>`;
            //     document.querySelector(".output").appendChild(li);
            // }

            // <li x-bind="disableNextAndPreviousButtons"
            //     className="flex w-1/3 shrink-0 snap-start flex-col items-center justify-center p-2" role="option">
            //     <img className="mt-2 w-full" src="https://picsum.photos/400/200?random=1" alt="placeholder image">
            //         <button x-bind="focusableWhenVisible" className="px-4 py-2 text-sm">
            //             Do Something
            //         </button>
            // </li>


            // getMainMovie();
        })
}

// let getMainMovie = () => {
//     let url = ''.concat(baseURL, 'movie/508943?api_key=', APIKEY);
//     fetch(url)
//         .then(result => result.json())
//         .then((data) => {
//             console.log('luca:', data);
//         })
// }

document.addEventListener('DOMContentLoaded', getConfig);