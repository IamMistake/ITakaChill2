
fetch("../backend/static/filmovi.json")
    .then(repos => repos.json())
    .then(repos =>{
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        repos.forEach((el)=>{

            // gospo znaj so se desava ovde

            let heading = document.createElement("div")
            heading.setAttribute("class","thumbnail-heading")
            heading.textContent = el.title

            let btn_group = document.createElement("div")
            btn_group.setAttribute("class","thumbnail-btns")

            let btn1 = document.createElement("div")
            btn1.setAttribute("class","button button-1")
            btn1.innerHTML = "<i class=\"fa-solid fa-circle-play\"></i> <span>Watch trailer</span>";


            let btn2 = document.createElement("div")
            btn2.setAttribute("class","button button-2")
            btn2.innerHTML = "<i class='fa-solid fa-star'></i> <span>Add to favorites</span>";


            btn_group.append(btn1,btn2)


            let tags = document.createElement("div")
            tags.setAttribute("class","tags")
            let n = el["genre"].length
            for(i=0;i<n;i++){
                let tag_element = document.createElement("div")
                tag_element.setAttribute("class","tag")
                tag_element.textContent = el["genre"][i]
                tags.append(tag_element)
            }

            let elem = document.createElement("div");
            elem.classList.add("swiper-slide");

            let elem1 = document.createElement("div")
            elem1.classList.add("img-container")

            let img = document.createElement("img")
            img.setAttribute("src",el.src)

            elem1.append(img)

            elem.append(elem1,tags,heading,btn_group)



            swiperWrapper.appendChild(elem);
        });

        const swiper = new Swiper('.swiper', {
            spaceBetween: 30,
            autoplay: {
                delay: 10000,
                disableOnInteraction: true,
            },
        });
    })
    .catch(error => {
        console.error("da da")
    });
