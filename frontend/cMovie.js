class Movie
{
    title;
    director;
    duration;
    genres;
    rating;
    year;
    price;
    id;


    constructor(id,title, director, duration, genres, rating, year, price)
    {
        this.id = id;
        this.title = title;
        this.director = director;
        this.duration = duration;
        this.genres = genres;
        this.rating = rating;
        this.year = year;
        this.price = price;
    }

    static getInstanceFromLocalStorage()
    {
        const movieString = localStorage.getItem("movie");
        const movieJson = JSON.parse(movieString);
        const { id, title, director, duration, genres, rating, year, price } = movieJson;
        return new Movie(id, title, director, duration, genres, rating, year, price);
    }

    static getInstanceFromJSON(movieJson)
    {

        return new Movie(
            movieJson.id,
            movieJson.title,
            movieJson.director,
            movieJson.length_seconds,
            movieJson.genre,
            movieJson.rating,
            movieJson.year,
            movieJson.cena
        );
    }

    get formattedDuration()
    {
        const hours = Math.floor(this.duration / 3600)
        const minutes = Math.floor((this.duration - hours * 3600) / 60);
        const seconds = Math.floor((this.duration - (hours * 3600 + minutes *  60)));
        return `${hours}:${minutes}:${seconds}`;
    }

    get HTMLFormat()
    {
        let html = `
            <div class="js-movie-info">
            <h4 class="js-movie-title">${this.title}</h4>
            <div class="js-movie-director">${this.director}</div>
            <div class="js-movie-genres">`

        this.genres.forEach(genre=>{
            html += `<div class="js-genre">${genre}</div>`
        })
        let endingHTML = `</div>
            <div class="js-movie-duration">
                ${this.formattedDuration}
            </div>
            <div>
                <button class="js-buy-ticket-btn" data-movie-id="${this.id}">Buy Ticker</button>
            </div>
        </div>`

        return html + endingHTML;
    }
}
