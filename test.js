"use strict";



function discover() {
    getData()
        .then(data => {
            console.log('outer', data);
            let animes = pickFourRandomAnimeFromArray(data);
            console.log(animes);
            let arrayUrlAnime = animes.map(function(element)
                {       
                return element.picUrl;})
            for(let i=0;i<arrayUrlAnime.length;i++){                
                let imgSrc = document.getElementById("imgContent"+i);    
                imgSrc.src = arrayUrlAnime[i];
                    }
            let arrayTitle = animes.map(function(element){
                return element.title;
                    })
            let arrayYears = animes.map(function(element){
                return element.year;
                    })
            let arrayStudio = animes.map(function(element){
                return element.studio;
                    })
                    let space = " <br> ";
                    let i = 0;
                    
                    let elementById = document.getElementById("textContent");
                    let textTitles = elementById.innerHTML = "";
                    elementById.innerHTML += arrayTitle[i];
                    elementById.innerHTML += space;
                    elementById.innerHTML += arrayYears[i];
                    elementById.innerHTML += space;
                    elementById.innerHTML += arrayStudio[i];
                    
                    let elementById1 = document.getElementById("textContent1");
                    textTitles = elementById1.innerHTML = "";
                    elementById1.innerHTML += arrayTitle[i + 1];
                    elementById1.innerHTML += space;
                    elementById1.innerHTML += arrayYears[i + 1];
                    elementById1.innerHTML += space;
                    elementById1.innerHTML += arrayStudio[i + 1];
                    
                    let elementById2 = document.getElementById("textContent2");
                    textTitles = elementById2.innerHTML = "";
                    elementById2.innerHTML += arrayTitle[i + 2];
                    elementById2.innerHTML += space;
                    elementById2.innerHTML += arrayYears[i + 2];
                    elementById2.innerHTML += space;
                    elementById2.innerHTML += arrayStudio[i + 2];
                    
                    let elementById3 = document.getElementById("textContent3");
                    textTitles = elementById3.innerHTML = "";
                    elementById3.innerHTML += arrayTitle[i + 3];
                    elementById3.innerHTML += space;
                    elementById3.innerHTML += arrayYears[i + 3];
                    elementById3.innerHTML += space;
                    elementById3.innerHTML += arrayStudio[i + 3];               
        }) 
        .catch(rej => {
            console.log(rej)
        })
};

const myParams = {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: 'cors',
    cache: 'default'
};

async function getData() {
    let data = [];
    try {
        let newRequest = new Request("./baza.json", myParams);
        let response = await fetch(newRequest);
        data = await response.json();
        return data;
    } catch (error) {
        console.log("error");
    }
};

let selectedRandomAnime = [];
let randomNumber = 0;

function pickFourRandomAnimeFromArray(data) {
    let randomFourAnime = [];
    while (randomFourAnime.length != 4) {
        if (data.length > 0) {
            for (let i = 0; i < 4; i++) {
                randomNumber = ~~(Math.random() * data.length);
                selectedRandomAnime = data.splice(randomNumber, 1);
                randomFourAnime = randomFourAnime.concat(selectedRandomAnime); 
            }
        } else {
            console.log("Array is empty");
        }
    }
    return randomFourAnime;
};

function showPanel(){
    document.getElementById("panel").style.display ="flex";
}