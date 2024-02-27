
async function fetchData(pth)
{
    try
    {
        let response = await fetch(pth);
        return response.json();
    }
    catch (e)
    {
        console.error("Error:", e);
    }
}

class UI
{
    movieElement
    constructor()
    {
        this.movieElement = document.querySelector('.js-movies')
    }

    addEventsForBuyButtons()
    {
        const buttons = document.querySelectorAll(".js-buy-ticket-btn");
        buttons.forEach(button => {
            button.addEventListener("click", ()=>{
                app.loadMovie(button.dataset.movieId)
            })
        })
    }
}

class MovieApp
{
    movies;
    constructor()
    {
        this.movies = new Map();
    }

    addMovie(movie)
    {
        this.movies.set(movie.id, movie);
    }

    loadMovie(movieId)
    {
        const movie = this.movies.get(parseInt(movieId));
        localStorage.setItem("movie", JSON.stringify(movie))
        window.location.href = "sali.html";
    }

    async  inti()
    {
        const moviesJson = await fetchData("https://raw.githubusercontent.com/IamMistake/ITakaChill/main/backend/static/filmovi.json");
        moviesJson.forEach(movieJson => {
            const movie = Movie.getInstanceFromJSON(movieJson);
            app.addMovie(movie)
        })
        render.renderMovies();
        ui.addEventsForBuyButtons()
    }
}

class Render
{
    renderMovies()
    {
        app.movies.forEach((movie,key) =>{
            ui.movieElement.innerHTML += movie.HTMLFormat
        });
    }
}

const app = new MovieApp();
const ui = new UI();
const render = new Render();
app.inti()
