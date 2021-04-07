(function() {
    const key = 'e9bcda9a';

    //search for Movies from input field

    let search = {
        init: function() {
            this.cacheDom();
            this.bindEvents();
        },

        cacheDom: function() {
            this.input = document.querySelector('.search__input');
            this.button = document.querySelector('.search__button');
            this.searchResults = document.querySelector('.results');
        },

        bindEvents: function() {
            this.button.addEventListener('click', this.searchMovies.bind(this));
        },

        searchMovies: function() {

            let searchValue = this.input.value;

            if(searchValue === "") {
                this.input.placeholder = "Type in moviename...";
                this.input.style.border = "1px solid red";
            } else {
                this.input.style.border = "none";
                this.input.placeholder = "";
                this.input.value = "";   
                let url = `http://www.omdbapi.com/?apikey=${key}&s=${searchValue}&type=movie`;

                fetch(url)
                    .then((response) => response.json())
                    .then(function(data) {
                        let movies = data.Search;
                        search.renderMovies(movies);
                    })
                    .catch(function(error) {
                        if(error) {
                            search.searchResults.innerHTML = '<h2 class="results__no-movies">No movies found...<br>try again</h2>'
                        }
                    })                
            }
        },

        renderMovies (movies) {
            this.searchResults.innerHTML = "";

            for(let movie of movies) {

                if(movie.Poster === 'N/A') {
                    movie.Poster = 'assets/img/poster-placeholder.jpg';
                }
                
                let singleMovie = `
                <div class="movie" id="${movie.imdbID}">
                    <div class="movie__top-container">
                        <img class="movie__img" src="${movie.Poster}" alt="Movie Poster">
                        <div class="movie__text-container">
                            <h3 class="movie__title">${movie.Title}</h3>
                            <p class="movie__year">${movie.Year}</p>
                        </div>
                    </div>
                    <button class="movie__library-button ${movie.imdbID}">Add to library</button>
                    <button class="movie__details-button">Details</button>
                </div>
            `;

            this.searchResults.innerHTML += singleMovie;

            }
            searchResults.init();
        }
    }


    //Open and add Details 

    let details = {
        init: function(data) {
            this.cacheDom();
            this.renderData(data);
        },

        cacheDom: function() {
            this.bg = document.querySelector('.details');
            this.card = document.querySelector('.card');
            this.imdbValue = document.querySelector('.details__imdb-value');
            this.img = document.querySelector('.details__img');
            this.genre = document.querySelector('.card__genre-value');
            this.runtime = document.querySelector('.card__runtime-value');
            this.cast = document.querySelector('.card__cast-value');
            this.title = document.querySelector('.card__title');
            this.plot = document.querySelector('.card__plot');
        },

        renderData(data) {
            this.bg.classList.add('details--open');
            this.card.classList.add('card--open');
            this.imdbValue.innerHTML = data.imdbRating;
            this.img.src = data.Poster;
            this.genre.innerHTML = data.Genre;
            this.runtime.innerHTML = data.Runtime;
            this.cast.innerHTML = data.Actors;
            this.title.innerHTML = data.Title;
            this.plot.innerHTML = data.Plot;
        }
    }


    //Add functionality to the buttons from searchresults

    let searchResults = {
        init: function() {
            this.cacheDom();
            this.bindEvents();
        },

        cacheDom: function() {
            this.libraryButtons = document.querySelectorAll('.movie__library-button');
            this.detailsButtons = document.querySelectorAll('.movie__details-button');
            this.closeDetails = document.querySelector('.details__close-icon');
            this.detailLibraryButton = document.querySelector('.card__button');
        },

        bindEvents: function() {
            for(let button of this.libraryButtons){button.addEventListener('click',this.addToLibrary.bind(this))};
            for(let button of this.detailsButtons){button.addEventListener('click', this.getDetailsForRender.bind(this))};
            this.closeDetails.addEventListener('click', this.close);
        },

        getDetailsForRender: function(e) {
            let movieId = e.target.parentElement.id;
            let url = `http://www.omdbapi.com/?apikey=${key}&i=${movieId}&plot=full`;

            fetch(url)
            .then((response) => response.json())
            .then(function(data) {
                searchResults.renderDetails(data);
            })
            .catch(function(error) {
                console.log(error);
            })
            
        },

        renderDetails(data) {
            details.init(data);
            this.detailLibraryButton.addEventListener('click', () => {
                data.Status = "Unwatched";
                let localData = searchResults.getLocalstorage();
                localData.push(data);
                searchResults.setLocalstorage(localData);
            });
        },

        close: function() {
            document.querySelector('.details').classList.remove('details--open');
            document.querySelector('.card').classList.remove('card--open');
        },

        addToLibrary: function(e) {
            let movieId = e.target.parentElement.id;
            let url = `http://www.omdbapi.com/?apikey=${key}&i=${movieId}&plot=full`;

            fetch(url)
                .then((response) => response.json())
                .then(function(data) {
                    
                    let localData = searchResults.getLocalstorage();
                    
                    if(library.findMovie(movieId) === undefined) {
                        data.Status = "Unwatched";                 
                        localData.push(data);
                        searchResults.setLocalstorage(localData);  
                        e.target.innerHTML = "In library";                      
                    } else {
                        e.target.innerHTML = "In library";
                    }
                })
                .catch(function(error) {
                    console.log(error);
                })
        },

        getLocalstorage() {
            if(localStorage.getItem('movielibrary') !== null) {
                return JSON.parse(localStorage.getItem('movielibrary'));
            } else {
                return [];
            }
        },

        setLocalstorage(localData) {
            const str = JSON.stringify(localData);
            localStorage.setItem('movielibrary', str);
        }

    }


    // get localstorage and show movies

    let renderLibrary = {
        init: function() {
            this.cacheDom();
            this.renderLibraryMovies();
        },

        cacheDom: function() {
            this.container = document.querySelector('.library__container');
        },

        getLocalstorage() {
            return searchResults.getLocalstorage();      
        },

        renderLibraryMovies: function() {
            let movies = this.getLocalstorage();

            if(movies.length === 0) {
                this.container.innerHTML = '<h2 class="library__no-movies">No movies in Library</h2>';
            } else {
                for(let movie of movies) {

                    let watched = "";
                    let watchedIcon = "";
                    let status = "Watched";

                    if(movie.Status === "Watched") {
                        watched = "movie--watched";
                        watchedIcon = "movie__watched--show";
                        status = "Unwatched";
                    }

                    if(movie.Poster === 'N/A') {
                        movie.Poster = 'assets/img/poster-placeholder.jpg';
                    }

                    let libraryMovie = `
                    <div class="movie ${watched}">
                        <img class="movie__watched ${watchedIcon}" src="assets/img/watched.svg" alt="">
                        <div class="movie__top-container">
                            <img class="movie__img" src="${movie.Poster}" alt="Movie Poster">
                            <div class="movie__text-container">
                                <h3 class="movie__title">${movie.Title}</h3>
                                <p class="movie__year">${movie.Year}</p>
                            </div>
                        </div>
                        <div class="movie__buttons-container" id="${movie.imdbID}">
                            <button class="movie__watched-button">${status}</button>       
                            <button class="movie__details-button">Details</button>
                            <button class="movie__remove-button"><img class="movie__remove-img" src="assets/img/delete.svg" alt=""></button>
                        </div>
                    </div>
                    `;

                    this.container.innerHTML += libraryMovie;                
                }    
            }
            library.init();
        }
    }


    //Add functionality to the library buttons

    let library = {
        init: function() {
            this.cacheDom();
            this.bindEvents();
        },

        cacheDom: function() {
            this.watchedButtons = document.querySelectorAll('.movie__watched-button');
            this.detailButtons = document.querySelectorAll('.movie__details-button');
            this.removeButtons = document.querySelectorAll('.movie__remove-button');
            this.closeDetails = document.querySelector('.details__close-icon');
        },

        bindEvents: function() {
            for(let button of this.detailButtons){button.addEventListener('click', this.showDetails.bind(this))};
            this.closeDetails.addEventListener('click', searchResults.close);
            for(let button of this.watchedButtons){button.addEventListener('click', this.toggleWatched.bind(this))}; 
            for(let button of this.removeButtons){button.addEventListener('click', this.removeMovie.bind(this))}; 
        },

        showDetails: function(e) {
            let id = e.target.parentElement.id;
            let data = this.findMovie(id);
            details.init(data);            
        },

        toggleWatched: function(e) {
            let id = e.target.parentElement.id;
            e.target.parentElement.parentElement.classList.toggle('movie--watched');
            e.target.parentElement.parentElement.firstElementChild.classList.toggle('movie__watched--show');

            let localData = this.getLocalstorage();
            for(let i = 0; i < localData.length; i++) {
                if(localData[i].imdbID === id) {
                    if(localData[i].Status === "Unwatched") {
                        localData[i].Status = "Watched";
                        e.target.innerHTML = "Unwatched";
                    } else if(localData[i].Status === "Watched") {
                        localData[i].Status = "Unwatched";
                        e.target.innerHTML = "Watched";
                    }
  
                    this.setLocalstorage(localData);
                } 
            }        
        },

        removeMovie: function(e) {
            let id = e.target.parentElement.parentElement.id;
            e.target.parentElement.parentElement.parentElement.remove(e.target.parentElement.parentElement);
            let localData = this.getLocalstorage();
            for(let i = 0; i < localData.length; i++) {
                if(localData[i].imdbID === id) {
                   localData.splice(i , 1)
                   searchResults.setLocalstorage(localData);
                }
            }
            
        },

        findMovie(id) {
            let localData = this.getLocalstorage();
            
            for(let i = 0; i < localData.length; i++) {
                if(localData[i].imdbID === id) {
                    return localData[i];
                }
            }
        }, 

        getLocalstorage() {
            return searchResults.getLocalstorage();      
        },

        setLocalstorage(localData) {
            searchResults.setLocalstorage(localData);
        }
    }


    //Open sidebar and get statistics from localstorage

    let sidebar = {
        init: function() {
            this.cacheDom();
            this.bindEvents();
        },

        cacheDom: function() {
            this.openButton = document.querySelector('.sidebar__label');
            this.sidebar = document.querySelector('.sidebar');
            this.libraryValue = document.querySelector('#library');
            this.watchedValue = document.querySelector('#watched');
            this.bestValue = document.querySelector('#best');
            this.worstValue = document.querySelector('#worst');
            
        },

        bindEvents: function() {
            this.openButton.addEventListener('click', this.openSidebar.bind(this));
        },

        openSidebar(e) {
            e.target.classList.toggle('sidebar__label--open');
            this.sidebar.classList.toggle('sidebar--open');
            this.getValues();
        },

        getValues() {
            let localData = searchResults.getLocalstorage();
            this.getMoviesNum(localData);
            this.getWatched(localData);
            this.getBest(localData);
            this.getWorst(localData);
        },

        getMoviesNum(localData) {
            this.libraryValue.innerHTML = localData.length;
        },

        getWatched(localData) {
            let num = 0;
            for(let i = 0; i < localData.length; i++) {
                if(localData[i].Status === "Watched") {
                    num++;
                }
            }
            this.watchedValue.innerHTML = num;
        },

        getBest(localData) {
            const max = localData.reduce((prev, current) => (prev.imdbRating > current.imdbRating) ? prev : current, 1);
            this.bestValue.innerHTML = `${max.Title} <span class="stats__num--small">(imdb: ${max.imdbRating})</span>`;
        },

        getWorst(localData) {
            const min = localData.reduce((prev, current) => (prev.imdbRating < current.imdbRating) ? prev : current, 1);
            this.worstValue.innerHTML = `${min.Title} <span class="stats__num--small">(imdb: ${min.imdbRating})</span>`;
        }
    }


    //Check what page it is and start

    if(document.body.classList.contains('search-page')) {
        search.init(); 
        sidebar.init();   
    } else {
        renderLibrary.init();
        sidebar.init();
    }

    
})()