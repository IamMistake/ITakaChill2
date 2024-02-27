import {Movie} from "./cMovie.js";


const app = new App();
const ui = new UI();

class UI
{
    constructor()
    {
        this.banner = document.getElementById("banner");
        this.sali = document.getElementById("sali");
        this.chairsElem = document.getElementById("place")
        this.movieInfoDiv = document.getElementById('movieInfo')
        this.h2 = this.movieInfoDiv.getElementsByTagName('h2')[0];
        this.director = this.movieInfoDiv.getElementsByTagName('h3')[0];
        this.ul = this.movieInfoDiv.getElementsByTagName('ul')[0];
    }
}

class App
{
    movie;

    constructor()
    {
        this.movie = null
    }

    async setupMovieInfo()
    {
        const movieId = Movie.getInstanceFromLocalStorage().id;
        this.movie = await fetchData(`http://127.0.0.1:5000/movies/${movieId}`)

        ui.h2.innerText = `${this.movie.title} + (${this.movie.rating})`;
        ui.director.innerText = `"By ${this.movie.director} in  ${this.movie.year}`;
        ui.ul.innerHTML = ""
        this.movie.genres.forEach(genre =>
        {
            ui.ul.innerHTML += `<li>${genre}</li>`
        })
        ui.banner.style.backgroundImage = `url(${this.movie.src})`;
        this.setupChairs(this.getFirstDate());
    }

    openSala(x)
    {
        ui.sali.innerHTML = `<div class="borderSala"></div>`;
        const dates = x.dates;
        const times = x.times;
        for (let i = 1; i <= dates.length; i++)
        {
            sali.innerHTML += `<div onclick="changeDate(this)" id="${"datum" + (i - 1)}" class="sala">
        ${dates[i - 1]}
        <p class="vreme" id="${"vreme" + i}">${times[i - 1]} - ${time(times[i - 1])}</p>
    </div>
    <div class="borderSala"></div>`
        }
    }



    getDates()
    {
        return this.movie.schedule.keys;
    }

    setupChairs(charMatrix)
    {
        ui.chairsElem.innerText = ""
        for (let i = 0; i < charMatrix.length; i++)
        {
            const row = charMatrix[i];
            for (let j = 0; j < row.length; j++)
            {
                const seat = row[j]
                if (seat === 1)
                {
                    let div = `<div data-row="${i}" data-seat="${j}" class="zafatenaChair"></div>`
                    charMatrix.innerHTML += div;
                }
                else
                {
                    let div = `<div onclick="zafati(this)" data-row="${i}" data-seat="${j}" class="nezafatenaChair"></div>`
                    ui.chairsElem.innerHTML += div;
                }
            }
            ui.chairsElem.innerHTML += `<div></div>`;
        }
    }
}


let datumSelected = 0;
let costBr = 0;

doStuff();

async function fetchData(pth)
{
    try
    {
        let response = await fetch(pth);
        return response.json();
    } catch (e)
    {
        console.error("Error: ", e);
    }
}

async function doStuff()
{
    await app.setupMovieInfo()

    // const saliData = await fetchData("../backend/static/sali.json");
    const m2 = await fetchData("http://127.0.0.1:5000/movies/0");
    console.log("M2", m2)


    saliData.forEach(x =>
    {
        if (x.id === id)
        {
            openSala(x);
            setupChairs(x)
        }
    })
}


async function changeDate(ova)
{
    let date = ova.id;
    datumSelected = parseInt(date.charAt(5));
    await doStuff();
}

function time(time)
{
    const h = parseInt(time.split(":")[0])
    const m = parseInt(time.split(":")[1])
    let tmpTime = new Date();
    tmpTime.setHours(h, m, 0);
    tmpTime.setSeconds(tmpTime.getSeconds() + movie['duration'])
    return tmpTime.toISOString().substr(11, 5);
}


async function zafati(chair)
{
    costBr++;
    let chairId = chair.id;
    let x = parseInt(chairId.toString().charAt(0));
    let y = parseInt(chairId.toString().charAt(1));

    // TODO NA BACKEND DA SE DADAT X,Y ZA DATUM[datumSelected] OD FILD ID = id

    chair.removeAttribute("onclick");
    chair.setAttribute("class", "zafatenaChairJas")

    presmetajCost();
}

function presmetajCost()
{
    let pari = document.getElementById('pari')
    let howmany = document.getElementById('howMany')
    let vkupno = document.getElementById('vkupno')
    let cenaSpan = document.getElementById('cena')
    cenaSpan.innerText = cena

    howmany.innerText = costBr;
    vkupno.innerText = costBr * cena;
}

function plati(btn)
{
    //SEND TO BACKEND TO PAY
    alert("NOT DONE YET HEHE :)" + "\t" +
        "(ako sakas drug film pojdi vo saliFunc.js i na prvata linija smeni id vo nekoe dr)")
}
