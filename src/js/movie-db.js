/*************
 1. To get the config data like image base urls
 https://api.themoviedb.org/3/configuration?api_key=<APIKEY>

 2. To fetch a list of movies based on a keyword
 https://api.themoviedb.org/3/search/movie?api_key=<APIKEY>&query=<keyword>

 3. To fetch more details about a movie
 https://api.themoviedb.org/3/movie/<movie-id>?api_key=<APIKEY>
 *************/

const APIKEY = '0497a560599e4b1196149db7ecbc29bb'; //TMDB api key
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;
let titles = "";

//grab base image
let getConfig = () => {
    let url = "".concat(baseURL, 'configuration?api_key=', APIKEY);
    fetch(url)
        .then((result) => {return result.json();})
        .then((data) => {
            baseImageURL = data.images.secure_base_url;
            configData = data.images;
            console.table('images:', data);
            getFeaturedMovie('508943');
            getPopularMovies(data);
            getComedyMovies(data);
            getFamilyMovies(data);
            getAdventureMovies(data);
            getScienceFictionMovies(data);
            getHorrorMovies(data);
        })
        .catch(function (err) {
            alert(err);
        });
}

//search
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let userInput = document.getElementById('search').value.trim();
    if (document.querySelector('.search-results').hasChildNodes()) {
        document.querySelector('.search-results').innerHTML = '';
    }
    if(userInput !== '') {
        searchMovie(userInput);
    }
});
document.getElementById('search').addEventListener('focus', (e) => {
    e.preventDefault();
    if (document.querySelector('.search-results').hasChildNodes()) {
        document.querySelector('.search-results').innerHTML = '';
    }
});

// search movie by search word
let searchMovie = (movie) => {
    let url = ''.concat(baseURL, 'search/movie', '?api_key=', APIKEY, '&query=', movie);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.table('Searched Movie:', data);
            data.results.forEach((searchedMovie) => {
                const {title, poster_path, id} = searchedMovie;
                let li = document.createElement("LI");
                let className = document.createAttribute("class");
                className.value = "bg-gray-100 hover:bg-gray-300 cursor-pointer transition-all";
                li.setAttributeNode(className);
                li.innerHTML =
                    `<span onclick="showDetails(${id});" class="block my-2 flex items-center space-x-3 py-2 px-2 max-h-20">
                         <img src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}" class="w-12 rounded-md">
                         <p class="font-semibold text-lg">${title}</p>
                     </span>`;
                document.querySelector(".search-results").appendChild(li);
            })
        });
}

//grab featured movie
let getFeaturedMovie = (id) => {
    let url = ''.concat(baseURL, 'movie/', id, '?api_key=', APIKEY);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.table('Featured Movie:', data);
                let div = document.createElement("DIV");
                let releaseDate = data.release_date;
                let newDate = releaseDate.slice(0, 4);
                div.innerHTML =
                    `<img src="https://lumiere-a.akamaihd.net/v1/images/image_2b9e98c7.png" alt="Luca Title" class="w-20 md:w-[6rem] xl:w-[12rem] 2xl:w-[14rem] transition-all duration-300">
                    <div class="flex space-x-3 mt-2 xl:mt-3 transition-all duration-300">
                        <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#DEDE50" class="w-4 h-4"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>
                            ${Math.floor(data.vote_average)}0%
                        </span>
                        <span>${data.runtime}min</span>
                        <span>(${newDate})</span>
                    </div>
                    <p class="font-semibold my-2 xl:my-5 sm:text-lg lg:text-2xl 2xl:text-3xl max-w-[50.5625rem] xl:max-w-[54.5625rem] transition-all duration-300" style="line-height: 1.7;">${data.overview}</p>
                    <a href="${data.homepage}" class="inline-flex items-center mt-5 md:mt-8 transition-all duration-300" target="_blank">
                        <span class="flex justify-center items-center w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem] lg:w-20 lg:h-20 rounded-full sm:hover:scale-95 transition-all duration-300" style="background-image: linear-gradient(to bottom right, #71E3CB 20%, #D22FE9);">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 lg:w-[5.5rem] lg:h-[5.5rem] ml-1 lg:ml-2 transition-all duration-300"><path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" /></svg>
                        </span>
                        <span class="ml-2 text-xl font-semibold md:text-2xl lg:text-[2rem] transition-all duration-300">Play</span>
                    </a>`;
                document.querySelector(".featured-movie-title").appendChild(div);
        });
}

//shows movie details
let showDetails = (id) => {
    let url = ''.concat(baseURL, 'movie/', id, '?api_key=', APIKEY);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.table('Movie Details:', data);
            let div = document.createElement("DIV");
            let elId = document.createAttribute("id");
            elId.value = "modal";
            div.setAttributeNode(elId);
            div.innerHTML =
                    `<div x-data="{ open: true }" class="relative" aria-labelledby="modal-title" role="dialog" aria-modal="true" style="z-index: 200;" x-show="open" x-on:keydown.escape.prevent.stop="open = false" x-cloak x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-10" x-transition:leave-end="opacity-0">
                        <div x-show="open" class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
                        <div class="fixed inset-0 z-10 overflow-y-auto" x-on:click.stop x-trap.noscroll.inert="open">
                            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" x-cloak x-show="open" x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100" x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                <div class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                    <div class="relative flex w-full items-center overflow-hidden bg-[#30385A] rounded-md px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-0">
                                        <button type="button" onclick="remove('modal');" x-on:click="open = false" class="absolute top-4 right-4 text-gray-500 hover:text-gray-100 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8 transition-all">
                                            <span class="sr-only">Close</span>
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <div class="sm:block lg:grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8 overflow-hidden">
                                            <div class="sm:hidden lg:block aspect-w-2 aspect-h-3 overflow-hidden rounded-lg lg:rounded-none bg-[#30385A] sm:col-span-4 lg:col-span-5">
                                                <img src="${'https://image.tmdb.org/t/p/w500/' + data.poster_path}" alt="${data.title}" class="object-cover object-center">
                                            </div>
                                            <div class="sm:col-span-8 lg:col-span-7 py-8 pr-8 overflow-y-auto">
                                                <h2 class="text-3xl font-medium text-white sm:pr-12">${data.title}</h2>
                                                <section aria-labelledby="information-heading" class="mt-1">
                                                    <h3 id="information-heading" class="sr-only">Movie information</h3>
                                                    <div class="mt-4">
                                                        <h4 class="sr-only">Reviews</h4>
                                                        <div class="flex items-center">
                                                            <div class="mr-1 flex items-center">
                                                                <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" /></svg>
                                                            </div>
                                                            <p class="text-sm text-white">
                                                                3.9
                                                                <span class="sr-only"> out of 10 stars</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </section>
                                                <section aria-labelledby="movie-overview" class="mt-8">
                                                    <h3 id="movie-overview" class="sr-only">Movie overview</h3>
                                                    <div class="mt-8">
                                                        <h4 class="text-white mb-3 text-lg font-semibold">Overview</h4>
                                                        <p class="text-white">${data.overview}</p>
                                                    </div>
                                                    <a href="${data.homepage}" target="_blank" class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
                                                        View Details
                                                    </a>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>                        
                            </div>
                        </div>
                    </div>`;
            document.body.appendChild(div);
        });
}

//grab list of popular movies
let getPopularMovies = (images) => {
    let url = ''.concat(baseURL, 'movie/popular?api_key=', APIKEY, '&language=en-US');
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.table('Popular Movies:', data);
            data.results.forEach((movie) => {
                const {title, poster_path, id} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center mb-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img onclick="showDetails(${id});" class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300 sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
                    <h3 class="hidden text-white lg:inline mt-1 2xl:text-2xl transition-all duration-300 2xl:text-2xl transition-all duration-300">${title}</h3>`;
                document.querySelector(".popular-movies").appendChild(li);
            })
        });
}

//grab list of comedy movies
let getComedyMovies = (images) => {
    let url = ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35&without_genres=27%2C10751%2C12%2C878&with_watch_monetization_types=flatrate');
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.table('Comedy Movies:', data);
            data.results.forEach((movie) => {
                const {title, poster_path, id} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center my-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img onclick="showDetails(${id});" class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
                    <h3 class="hidden text-white lg:inline mt-1 2xl:text-2xl transition-all duration-300">${title}</h3>`;
                document.querySelector(".comedy-movies").appendChild(li);
            })
        });
}

//grab list of adventure movies
let getAdventureMovies = (images) => {
    let url = ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=12&without_genres=35%2C10751%2C27%2C878&with_watch_monetization_types=flatrate');
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.table('Adventure Movies:', data);
            data.results.forEach((movie) => {
                const {title, poster_path, id} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center my-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img onclick="showDetails(${id});" class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
                    <h3 class="hidden text-white lg:inline mt-1 2xl:text-2xl transition-all duration-300">${title}</h3>`;
                document.querySelector(".adventure-movies").appendChild(li);
            })
        });
}

//grab list of family movies
let getFamilyMovies = (images) => {
    let url = ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10751&without_genres=35%2C12%2C27%2C878&with_watch_monetization_types=flatrate');
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.table('Family Movies:', data);
            data.results.forEach((movie) => {
                const {title, poster_path, id} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center my-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img onclick="showDetails(${id});" class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
                    <h3 class="hidden text-white lg:inline mt-1 2xl:text-2xl transition-all duration-300">${title}</h3>`;
                document.querySelector(".family-movies").appendChild(li);
            })
        });
}

//grab list of science fiction movies
let getScienceFictionMovies = (images) => {
    let url = ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=878&without_genres=35%2C12%2C27%2C10751&with_watch_monetization_types=flatrate');
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.table('Science Fiction Movies:', data);
            data.results.forEach((movie) => {
                const {title, poster_path, id} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center my-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img onclick="showDetails(${id});" class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
                    <h3 class="hidden text-white lg:inline mt-1 2xl:text-2xl transition-all duration-300">${title}</h3>`;
                document.querySelector(".science-fiction-movies").appendChild(li);
            })
        });
}

//grab list of horror movies
let getHorrorMovies = (images) => {
    let url = ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&without_genres=35%2C10751%2C12%2C878&with_watch_monetization_types=flatrate');
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.table('Horror Movies:', data);
            data.results.forEach((movie) => {
                const {title, poster_path, id} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center my-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img onclick="showDetails(${id});" class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
                    <h3 class="hidden text-white lg:inline mt-1 2xl:text-2xl transition-all duration-300">${title}</h3>`;
                document.querySelector(".horror-movies").appendChild(li);
            })
        });
}

let remove = (el) => {
    document.getElementById(el).remove();
}

document.addEventListener('DOMContentLoaded', getConfig);