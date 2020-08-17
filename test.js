"use strict";
function discover(data) {
    getData()
        .then(data => {
            console.log('outer', data);
            let animes = pickFourRandomAnimeFromArray(data);
            let arrayUrlAnime = animes.map(function(element){       
                return element.picUrl;
            })
            for(let i=0;i<arrayUrlAnime.length;i++){ 
                console.log(arrayUrlAnime);               
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

            function addDescription(item,title,year,studio){
                document.getElementById(item).addEventListener('click',function(){          
                    let tittleId = document.getElementById('titleContainer1');
                    let descriptionId =  document.getElementById('descriptionContent1');
                    tittleId.innerHTML = "";
                    descriptionId.innerHTML = "";
                    setTimeout(function(){
                        tittleId.innerHTML = "";
                        descriptionId.innerHTML = "";
                        tittleId.innerHTML += title;
                        descriptionId.innerHTML += year;
                        descriptionId.innerHTML += space;
                        descriptionId.innerHTML += studio;
                    },4500);
                });
            }
            addDescription('item1',arrayTitle[i],arrayYears[i],arrayStudio[i]);
            addDescription('item2',arrayTitle[i+1],arrayYears[i+1],arrayStudio[i+1]);
            addDescription('item3',arrayTitle[i+2],arrayYears[i+2],arrayStudio[i+2]);
            addDescription('item4',arrayTitle[i+3],arrayYears[i+3],arrayStudio[i+3]);
        })
        
        .catch(err => {
            console.log(err)
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
    try {
        let data = [];
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
    document.getElementById("carouselAnime").style.display ="block";
}

const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        document.getElementById('body').classList.add('bg-dark');
        document.getElementById('siteName').style.color = 'white';
        document.getElementById('carouselAnime').style.boxShadow = '0px 0px 43px 32px rgba(0,0,0,0.66)';
    }
    else if(currentTheme === 'light'){
        toggleSwitch.checked = false;
        document.getElementById('body').classList.remove('bg-dark');
        document.getElementById('siteName').style.color = 'black';
        document.getElementById('carouselAnime').style.boxShadow = '0px 0px 43px 32px rgb(245, 243, 243)';
    }
}
function switchTheme(e){
    console.log(localStorage.getItem('theme'));

    if (e.target.checked) {
        document.getElementById('body').classList.add('bg-dark');
        document.getElementById('siteName').style.color = 'white';
        document.getElementById('carouselAnime').style.boxShadow = '0px 0px 43px 32px rgba(0,0,0,0.66)';
        localStorage.setItem('theme', 'dark');
    }
    else {        
        document.getElementById('body').classList.remove('bg-dark');
        document.getElementById('siteName').style.color = 'black';
        document.getElementById('carouselAnime').style.boxShadow = '0px 0px 43px 32px rgb(245, 243, 243)';
        localStorage.setItem('theme', 'light');
    }    
}
toggleSwitch.addEventListener('change', switchTheme, false);

let currentDeg = 720;
function rotateSvg(){
    let sectionText = document.getElementById('sectionText');
    sectionText.style.transform = 'rotate('+currentDeg+'deg)';
    currentDeg+=720;
    if(currentDeg>20000){
        currentDeg=720;
    }
    return;
 }
