fetch("../backend/static/filmovi.json")
    .then(repos => repos.json())
    .then(repos =>{
        const swiper = document.querySelector('.splide__list');
        repos.forEach((el)=>{

            //creating li
            let li_item = document.createElement("li")
            li_item.setAttribute("class","splide__slide")

            //creating img
            let image = document.createElement("img")
            image.setAttribute("class","container-img")
            image.setAttribute("src",el.src)

            //creating movie name
            let mov_name = document.createElement("div")
            mov_name.setAttribute("class","container-movie-heading")
            mov_name.textContent = el.title

            //collection buttons
            let btn1 = document.createElement("div")
            btn1.textContent = "Buy a ticket!"
            btn1.setAttribute("class","btn-1")


            //creating stars rating
            let rate = document.createElement("div")
            rate.setAttribute("class","container-movie-rating")

            let rate_stars = parseInt(el.rating / 2.0)
            console.log(rate_stars)
            for (i=0;i<rate_stars;i++)
            {
                //create stars
                let star = document.createElement("i")
                star.setAttribute("class","fa-solid fa-star")
                star.setAttribute("style","color: #FFD43B")
                rate.append(star)
                // console.log(rate)
            }
            for (i=0;i<5-rate_stars;i++){
                let starr = document.createElement("i")
                starr.setAttribute("class","fa-solid fa-star")
                starr.setAttribute("style","color: #949494")
                rate.append(starr)
            }

            //appending all items to li_item
            li_item.append(image,mov_name,rate)

            swiper.append(li_item);
        });
        var splide = new Splide( '.splide', {
            type    : 'loop',
            perPage : 3,
            gap:-130,
            arrows:false,
            nav:false,
            pagination:false,
            autoplay: true,
        } );

        splide.mount();

    })
    .catch(error => {
        console.error("da da")
    });




