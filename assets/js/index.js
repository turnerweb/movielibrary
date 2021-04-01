//open sidebar 

const label = document.querySelector('.sidebar__label');

label.addEventListener('click', (e) => {
    e.target.classList.toggle('sidebar__label--open');
    document.querySelector('.sidebar').classList.toggle('sidebar--open');
});


//movie search

let movies = [
    {
        "Title": "Terminator 2: Judgment Day",
        "Year": "1991",
        "imdbID": "tt0103064",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    },
    {
        "Title": "The Terminator",
        "Year": "1984",
        "imdbID": "tt0088247",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
    },
    {
        "Title": "Terminator 3: Rise of the Machines",
        "Year": "2003",
        "imdbID": "tt0181852",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTk5NzM1ODgyN15BMl5BanBnXkFtZTcwMzA5MjAzMw@@._V1_SX300.jpg"
    },
    {
        "Title": "Terminator Salvation",
        "Year": "2009",
        "imdbID": "tt0438488",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BODBlOTJhZjItMGRmYS00YzM1LWFmZTktOTJmNDMyZTBjMjBkXkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg"
    },
    {
        "Title": "Terminator Genisys",
        "Year": "2015",
        "imdbID": "tt1340138",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjM1NTc0NzE4OF5BMl5BanBnXkFtZTgwNDkyNjQ1NTE@._V1_SX300.jpg"
    },
    {
        "Title": "Terminator: Dark Fate",
        "Year": "2019",
        "imdbID": "tt6450804",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOWExYzVlZDgtY2E1ZS00NTFjLWFmZWItZjI2NWY5ZWJiNTE4XkEyXkFqcGdeQXVyMTA3MTA4Mzgw._V1_SX300.jpg"
    },
    {
        "Title": "Lady Terminator",
        "Year": "1989",
        "imdbID": "tt0095483",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTg5NTA1NzEtNWNiNy00ZTc4LWJhZTgtYmJkODZhYWI3NmQ4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
        "Title": "Ninja Terminator",
        "Year": "1986",
        "imdbID": "tt0199849",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMGZiNTczNWItOTdmYy00OTFjLWIwOWUtMmE3Y2QyNzBmZDJkXkEyXkFqcGdeQXVyNzg3NjQyOQ@@._V1_SX300.jpg"
    },
    {
        "Title": "Alien Terminator",
        "Year": "1995",
        "imdbID": "tt0112320",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTc3NjY4YjItZWFjYi00MzQxLWE1M2UtZGU1OTBjZWZlZjkyXkEyXkFqcGdeQXVyMjI4NzM3NTM@._V1_SX300.jpg"
    },
    {
        "Title": "Russian Terminator",
        "Year": "1989",
        "imdbID": "tt0100531",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYjBmM2YyMGMtZTMxZS00OWZlLWEyYzQtNzUyYWFmMWM2N2M1XkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_SX300.jpg"
    }
];


function searchMovies(url) {
    fetch(url)
        /* .then((response) => response.json()) */
        .then(function(data) {

            /* let movies = data.Search; */

            console.log(movies)

            for(let movie of movies) {
                
                let singleMovie = `
                    <div class="movie">
                        <div class="movie__top-container">
                            <img class="movie__img" src="${movie.Poster}" alt="Movie Poster">
                            <div class="movie__text-container">
                                <h3 class="movie__title">${movie.Title}</h3>
                                <p class="movie__year">${movie.Year}</p>
                            </div>
                        </div>
                        <button class="movie__library-button">Add to library</button>
                        <button class="movie__details-button" id="${movie.imdbID}">Details</button>
                    </div>
                `;

                resultContainer.innerHTML += singleMovie;
            }

        })
        .catch(function (error) {
            console.log(error);
        })

}

let resultContainer = document.querySelector('.results');

document.querySelector('.search__button').addEventListener('click', () => {
    resultContainer.innerHTML = '';
    document.querySelector('.results__title').innerHTML = 'Search Results';

    let searchQuery = document.querySelector('.search__input').value;
    const key = 'e9bcda9a';
    let url = `http://www.omdbapi.com/?apikey=${key}&s=${searchQuery}&type=movie`;

    searchMovies(url);

});