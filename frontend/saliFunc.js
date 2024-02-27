let movie = localStorage.getItem('movie')
movie = JSON.parse(movie)
let id = movie['id']
let cena = movie['price']
console.log(movie)

let banner = document.getElementById("banner");
let sali = document.getElementById("sali");
let chairsElem = document.getElementById("place")

let datumSelected = 0;
let costBr = 0;

doStuff();

async function fetchData(pth) {
    try {
        let response = await fetch(pth);
        return response.json();
    } catch (e) {
        console.log(e);
    }
}

async function doStuff() {
    setupMovieInfo()

    const saliData = await fetchData("../backend/static/sali.json");
    const m2 = await fetchData("http://127.0.0.1:5000/movies/0");
    console.log("M2", m2)

    saliData.forEach(x => {
        if(x.id === id) {
            openSala(x);
            thumbnail(x);
            chairs(x)
        }
    })
}

function setupMovieInfo() {
    let movieInfoDiv = document.getElementById('movieInfo')

    let h2 = movieInfoDiv.getElementsByTagName('h2')[0];
    h2.innerText = movie['title'] + ` (${movie['rating']})`;

    let director = movieInfoDiv.getElementsByTagName('h3')[0];
    director.innerText = "By " + movie['director'] + " in " + movie['year'];

    let ul = movieInfoDiv.getElementsByTagName('ul')[0];
    ul.innerHTML = ""
    for (let i = 0; i < movie['genres'].length; i++) {
        ul.innerHTML += `<li>${movie['genres'][i]}</li>`
    }
}

function openSala(x) {
    // const n = x.saliNumber;
    sali.innerHTML = `<div class="borderSala"></div>`;
    const dates = x.dates;
    const times = x.times;
    for (let i = 1; i <= dates.length; i++) {
        sali.innerHTML += `<div onclick="changeDate(this)" id="${"datum" + (i - 1)}" class="sala">
        ${dates[i - 1]}
        <p class="vreme" id="${"vreme" + i}">${times[i - 1]} - ${time(times[i - 1])}</p>
    </div>
    <div class="borderSala"></div>`
    }
}

async function changeDate(ova) {
    let date = ova.id;
    datumSelected = parseInt(date.charAt(5));
     await doStuff();
}

function time(time) {
    const h = parseInt(time.split(":")[0])
    const m = parseInt(time.split(":")[1])
    let tmpTime = new Date();
    tmpTime.setHours(h, m, 0);
    tmpTime.setSeconds(tmpTime.getSeconds() + movie['duration'])
    return tmpTime.toISOString().substr(11, 5);
}

function thumbnail(x) {
    let bgUrl = x.thumbnail;
    banner.style.backgroundImage = `url(${bgUrl})`;
}

function chairs(x) {
    costBr = 0;
    chairsElem.innerText = ""
    let matrix = x.matrix[datumSelected];   // 0 E KOJA SALA CE BIDIT
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(matrix[i][j] === 1) {
                let div = `<div id="${"" + i + j}" class="zafatenaChair"></div>`
                chairsElem.innerHTML += div;
            } else {
                let div = `<div onclick="zafati(this)" id="${"" + i + j}" class="nezafatenaChair"></div>`
                chairsElem.innerHTML += div;
            }
        }
        chairsElem.innerHTML += `<div></div>`;
    }
    presmetajCost();
}

async function zafati(chair) {
    costBr++;
    let chairId = chair.id;
    let x = parseInt(chairId.toString().charAt(0));
    let y = parseInt(chairId.toString().charAt(1));

    // TODO NA BACKEND DA SE DADAT X,Y ZA DATUM[datumSelected] OD FILD ID = id

    chair.removeAttribute("onclick");
    chair.setAttribute("class", "zafatenaChairJas")

    presmetajCost();
}

function presmetajCost() {
    let pari = document.getElementById('pari')
    let howmany = document.getElementById('howMany')
    let vkupno = document.getElementById('vkupno')
    let cenaSpan = document.getElementById('cena')
    cenaSpan.innerText = cena

    howmany.innerText = costBr;
    vkupno.innerText = costBr * cena;
}

function plati(btn) {
    //SEND TO BACKEND TO PAY
    alert("NOT DONE YET HEHE :)" + "\t" +
        "(ako sakas drug film pojdi vo saliFunc.js i na prvata linija smeni id vo nekoe dr)")
}