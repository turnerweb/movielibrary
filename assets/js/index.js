(function() {
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
            const key = 'e9bcda9a';
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
        }
    }

    search.init();
})()