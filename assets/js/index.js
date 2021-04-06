(function() {
    const key = 'e9bcda9a';

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
            this.input.value = "";   
            let url = `http://www.omdbapi.com/?apikey=${key}&s=${searchValue}&type=movie`;

            fetch(url)
                .then((response) => response.json())
                .then(function(data) {
                    let movies = data.Search;
                    search.renderMovies(movies);
                })
                .catch(function(error) {
                    console.log(error);
                })
        },

        renderMovies (movies) {
            this.searchResults.innerHTML = "";

            for(let movie of movies) {
                
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
            searchResults.init(movies);//delete if not used
        }
    }

    let searchResults = {
        init: function(movies) {
            let movieList = movies;//delete if not used
            this.cacheDom();
            this.bindEvents();
        },

        cacheDom: function() {
            this.libraryButtons = document.querySelectorAll('.movie__library-button');
            this.detailsButtons = document.querySelectorAll('.movie__details-button');
            this.closeDetails = document.querySelector('.details__close-icon');
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

        bindEvents: function() {
            /* for(let button of this.libraryButtons){button.addEventListener('click',addToLibrary)}; */
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
            console.log(data)
            this.bg.classList.add('details--open');
            this.card.classList.add('card--open');
            this.imdbValue.innerHTML = data.imdbRating;
            this.img.src = data.Poster;
            this.genre.innerHTML = data.Genre;
            this.runtime.innerHTML = data.Runtime;
            this.cast.innerHTML = data.Actors;
            this.title.innerHTML = data.Title;
            this.plot.innerHTML = data.Plot;
        },

        close: function() {
            document.querySelector('.details').classList.remove('details--open');
            document.querySelector('.card').classList.remove('card--open');
        }

    }

    search.init();
})()