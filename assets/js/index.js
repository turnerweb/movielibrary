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


let details = {
    "Title": "Terminator Salvation",
    "Year": "2009",
    "Rated": "PG-13",
    "Released": "21 May 2009",
    "Runtime": "115 min",
    "Genre": "Action, Sci-Fi",
    "Director": "McG",
    "Writer": "John Brancato, Michael Ferris",
    "Actors": "Christian Bale, Sam Worthington, Moon Bloodgood, Helena Bonham Carter",
    "Plot": "In 2003, in the Longview State Correctional Facility, the criminal Marcus Wright is on death row, and is convinced by the cancerous Dr. Serena Kogan to donate his body to her research and he accepts. In 2018, after an unsuccessful attack to a Skynet facility, only John Connor survives, but he discovers that Skynet is developing the powerful new model T-800. Out of the blue, Marcus appears naked and with amnesia in the location. Marcus befriends the teenager Kyle Reese and the girl Star who help him to survive the lethal machines and they travel together in a Jeep. Meanwhile the resistance discovers a signal that might turn-off the machines and John offers to test it. When Kyle is captured by a machine and brought to the Skynet headquarters, Marcus decides to help the youngster and heads to Skynet; on the way, he saves Blair Williams who suggests to him that he should meet John Connor first. But Marcus steps on a mine and is submitted to surgery, when a secret about his origins is disclosed.",
    "Language": "English, Italian",
    "Country": "USA, Germany, UK, Italy",
    "Awards": "2 wins & 14 nominations.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODBlOTJhZjItMGRmYS00YzM1LWFmZTktOTJmNDMyZTBjMjBkXkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "6.5/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "33%"
        },
        {
            "Source": "Metacritic",
            "Value": "49/100"
        }
    ],
    "Metascore": "49",
    "imdbRating": "6.5",
    "imdbVotes": "344,733",
    "imdbID": "tt0438488",
    "Type": "movie",
    "DVD": "22 Apr 2011",
    "BoxOffice": "$125,322,469",
    "Production": "Moritz Borman",
    "Website": "N/A",
    "Response": "True"
}


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
            getMovieDetails();
        })
        .catch(function (error) {
            console.log(error);
        })
};



function getMovieDetails() {

    let detailButtons = document.querySelectorAll('.movie__details-button');

    for(let button of detailButtons) {
        button.addEventListener('click', (e) => {
            const key = 'e9bcda9a';
            let movieId = e.target.id;
            let detailUrl = `http://www.omdbapi.com/?apikey=${key}&i=${movieId}&plot=full`;

            fetch(detailUrl)
                /* .then((response) => response.json()) */
                .then(function(data) {
                   /*  let details = data; */

                    let bg = document.querySelector('.details');
                    let card = document.querySelector('.card');
                    
                    bg.classList.add('details--open');
                    card.classList.add('card--open');

                    document.querySelector('.details__imdb-value').innerHTML = details.imdbRating;
                    document.querySelector('.details__img').src = details.Poster;
                    document.querySelector('.card__genre-value').innerHTML = details.Genre;
                    document.querySelector('.card__runtime-value').innerHTML = details.Runtime;
                    document.querySelector('.card__cast-value').innerHTML = details.Actors;
                    document.querySelector('.card__title').innerHTML = details.Title;
                    document.querySelector('.card__plot').innerHTML = details.Plot;


                    document.querySelector('.details__close').addEventListener('click', () => {
                        bg.classList.remove('details--open');
                        card.classList.remove('card--open');
                    })
                


                })
                .catch(function(error) {
                    console.log(error);
                })
        })
    }


};





let resultContainer = document.querySelector('.results');

document.querySelector('.search__button').addEventListener('click', () => {

    resultContainer.innerHTML = '';
    document.querySelector('.results__title').innerHTML = 'Search Results';

    let searchQuery = document.querySelector('.search__input').value;
    const key = 'e9bcda9a';
    let url = `http://www.omdbapi.com/?apikey=${key}&s=${searchQuery}&type=movie`;

    searchMovies(url);

});