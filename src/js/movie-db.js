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

//grab list of popular movies
let getPopularMovies = (images) => {
    let url = ''.concat(baseURL, 'movie/popular?api_key=', APIKEY, '&language=en-US');
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            console.table('Popular Movies:', data);
            data.results.forEach((movie) => {
                const {title, poster_path} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center mb-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300 sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
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
                const {title, poster_path} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center my-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
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
                const {title, poster_path} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center my-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
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
                const {title, poster_path} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center my-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
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
                const {title, poster_path} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center my-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
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
                const {title, poster_path} = movie;
                let li = document.createElement("LI");
                let bind = document.createAttribute("x-bind");
                bind.value = "disableNextAndPreviousButtons";
                let className = document.createAttribute("class");
                className.value = "flex w-[7.6rem] sm:w-[13.75rem] 2xl:w-[20.75rem] shrink-0 snap-start flex-col items-center justify-center my-2 mx-3 cursor-pointer transition-all duration-300";
                li.setAttributeNode(bind);
                li.setAttributeNode(className);
                li.innerHTML =
                    `<img class="mt-2 w-full rounded sm:hover:scale-95 transition-all duration-300" src="${'https://image.tmdb.org/t/p/w500/' + poster_path}" alt="${title}">
                    <h3 class="hidden text-white lg:inline mt-1 2xl:text-2xl transition-all duration-300">${title}</h3>`;
                document.querySelector(".horror-movies").appendChild(li);
            })
        });
}


document.addEventListener('DOMContentLoaded', getConfig);