'use strict'
//Scroll Into View Start//////////
//The scroll variable as below will be the same as each of the id of each parent element.

let navibar= document.querySelectorAll('[data-navibar]')  
navibar.forEach((nav)=>{
  nav.addEventListener('click',function(e){
 let scroll=e.target.dataset.navibar
    console.log(scroll)
    document.getElementById(scroll).scrollIntoView({behavior: "smooth"})

  })
})
//Scroll Into View End//////////

//////////////////////Front_Page Start////////////////////////////
let developer = document.querySelector(".webDeveloper");
let text = "Am A Web Developer";
let slice = 0;

setInterval(() => {
  if (slice > text.length) {
    slice = 0;
  } else {
    slice++;
  }
  developer.textContent = "I " + text.slice(0, slice);
}, 700);

//////////////////////Front_Page End////////////////////////////
//////////////////////Weather Start////////////////////////////



//////////////////////Weather Start////////////////////////////

const submit = document.querySelector(".submit");
let inputvalue = document.getElementById("City");
let key = "fcc8de7015bbb202209bbf0261babf4c";
let city = document.querySelector(".city");
let temperature = document.querySelector(".temperature");
let time = document.querySelector(".time");
let day = document.querySelector(".day");
let conditions = document.querySelector(".conditions");
let description = document.querySelector(".description");
let temp = document.querySelector(".temp");
let parameters = document.querySelectorAll(".parameters");
let img = document.querySelector(".img");

let Day =
  `${new Date().getDate()}/`.padStart(3, "0") +
  `${new Date().getMonth()}/`.padStart(3, "0") +
  `${new Date().getFullYear()}`.padStart(2, "0");
let Time =
  `${new Date().getHours()}:`.padStart(3, "0") +
  `${new Date().getMinutes()}:`.padStart(3, "0") +
  `${new Date().getSeconds()}`.padStart(2, "0");

console.log(Time);
console.log(Day);
time.textContent = Time;
day.textContent = Day;
//submit.addEventListener("click", function () {
// console.log(latitude);
// console.log(longitude);
// fetch(
//   `https://api.openweathermap.org/data/2.5/weather?q=${inputvalue.value}&appid=${key}`
// )
//   .then((database) => {
//    if (!database.ok) {
//      throw new Error(`Location was not found ${database.status}`);
//   }
//    console.log(database);
//    return database.json();
//  })
//  .then((data) => {
//  console.log(data);
// })
// .catch((err) => {
//    console.log(err);
//  });
//});
//
//////////First Function///////////
const actions1 = function (act) {
  parameters.forEach((ev) => {
    ev.addEventListener("click", function (e) {
      parameters.forEach((ev) => {
        ev.classList.remove("accessor");
      });
      e.target.classList.add("accessor");
      //wind clicked
      if (e.target.classList.contains("wind")) {
        temperature.textContent = `${act.wind.speed}m/h`;
      }
      // temp clicked
      if (e.target.classList.contains("temp")) {
        temperature.textContent = `${(act.main.temp - 273.15).toFixed(2)} °C`;
      }
      //humidity clicked
      if (e.target.classList.contains("humidity")) {
        temperature.textContent = `${act.main.humidity}%`;
      }
    });
  });
};
//////////Second Function///////////
const actions2 = function (act2) {
  //city name
  city.textContent = act2.name;
  //temperature//
  temperature.textContent = `${(act2.main.temp - 273.15).toFixed(2)} °C`;
  if (Number.parseFloat(temperature.textContent) > 20) {
    temperature.style.color = "green";
  } else if (
    Number.parseFloat(temperature.textContent) < 20 &&
    Number.parseFloat(temperature.textContent) > 10
  ) {
    temperature.style.color = "grey";
  } else {
    temperature.style.color = "red";
  }
  //data descriptions
  conditions.textContent = act2.weather[0].main;
  description.textContent = `/${act2.weather[0].description}`;
  //colors
  parameters.forEach((ev) => {
    ev.classList.remove("accessor");
  });
  temp.classList.add("accessor");
  // img
  if (act2.weather[0].main) {
    img.src = `http://openweathermap.org/img/w/${act2.weather[0].icon}.png`;
    img.style.display = "grid";
  } else {
    img.style.display = "none";
  }
};
//////////City Called///////////
submit.addEventListener("click", function () {
  const weather = async function () {
    try {
      let database = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputvalue.value}&appid=${key}`
      );
      if (!database.ok) {
        alert("Something went wrong");
        //throwing errors
        throw new Error("Something went wrong");
      }
      let data = await database.json();

      //////////////// Functions called //////////////////////////
      actions2(data);
      actions1(data);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };
  weather();
});

//////////////////////Weather End////////////////////////////

//////////////////////Map Start////////////////////////////

//IN ORDER FOR You to have the access at the map then you need to approve your geolocation.
let DistanceBicycle=document.querySelector('.DistanceBicycle')
let DistanceCar=document.querySelector('.DistanceCar')
let DistanceWalking=document.querySelector('.DistanceWalking')
let DistanceAll=document.querySelector('.DistanceAll')
navigator.geolocation.getCurrentPosition(
  //Accepted Location

  function(position){
    //Curent Location
  console.log(position)
  let latitude=position.coords.latitude
  let longitude=position.coords.longitude
  console.log(latitude)
  console.log(longitude)
let cordinates=[latitude,longitude]

  var map = L.map("map").setView(cordinates, 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker(cordinates)
  .addTo(map)
  .bindPopup("Your Location")
  .openPopup();
// Clicked Location map.on the same as AddeventListener from Leaflet
map.on("click", function (ev) {
  DistanceAll.textContent=''
  DistanceWalking.textContent=''
  DistanceCar.textContent=''
  DistanceBicycle.textContent=''
  let clickedLocation = [ev.latlng.lat, ev.latlng.lng];
  console.log(ev)
  L.marker(clickedLocation)
    .addTo(map)
    .bindPopup("New Location")
    .openPopup()
    
    //Measuring the Distance and time
    let Distance = (ev.target.distance(cordinates, clickedLocation)/1000).toFixed(2);
    DistanceAll.textContent=`Distance: ${Distance}miles`
    let averageWalkingPace=2.5
    let averageBicycleSpeed=10
    let averageCarSpeed=65

    DistanceWalking.textContent=`Distance on time Walking: ${(Distance/2.5).toFixed(2)} hours`
    DistanceCar.textContent=`Distance on time Car: ${(Distance/10).toFixed(2)} hours`
    DistanceBicycle.textContent=`Distance on time Bicycle: ${(Distance/65).toFixed(2)} hours`
  });
  
},
//Rejected Location
function(){
alert('In order for you to have the access at the map then you need to approve your geolocation')
})



//////////////////////Map End////////////////////////////

//////////////////////Calculatior Start////////////////////////////

let calcButtons = document.querySelectorAll("[data-number]");
let calcContainer = document.getElementById("calcInput");
let equalButton = document.querySelector(".equalCalc");
let deleteButton = document.querySelector(".AcCalc");
let dotButton=document.querySelector('.dot')
let inputValue=''


calcButtons.forEach((buttons) => {
  buttons.addEventListener("click", function (e) {
    inputValue= inputValue+ e.target.dataset.number;
    calcContainer.value = inputValue
  });
});

equalButton.addEventListener('click',function(){
  if(!calcContainer.value){
    calcContainer.value=''
  }
  else{
  calcContainer.value=eval(inputValue)
  inputValue=''
  }
  if( calcContainer.value==='undefined'){
    calcContainer.value= ' '
    inputValue=''
     }
})

deleteButton.addEventListener('click',function(){
  inputValue=''
  calcContainer.value= inputValue
})
dotButton.addEventListener('click',function(){
  if( calcContainer.value.length<=1){
   calcContainer.value= ' '
   inputValue=''
   
  }
})



//////////////////////Calculatior End////////////////////////////
//////////////////////Game Start////////////////////////////

let imageUser=document.querySelector('.imageUser')
let imageComp=document.querySelector('.imageComp')
let resultsH1=document.querySelector('.ResultsH1')
let possibilities=['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKfSURBVGhD7ZjJy81RGIA/GaPMItPOglhJFqzIEDZIypBhoZQkfYXwB1BCFhZ2UqSQsqCUJHMyZWnKkFhQyDw8z/nu6XeTm+m+9/Pdfk89fb/3/W7nnPeec+8957SUlJSUlDQj/bB722PHoBt2antMLMG7+A0/42kci5n/rrjpeBU/4Rs8jJvRAvRj1fML9H8W+AU/4BEcgu3KfPyKDvId+s7nQesG7IpD8WIll61+/R3sgtILq2e2IeSlsxUdyEA8Vck9weoBzULzFj4PO6Ovv4Hm9+ODyvN7PIa+AeEMQDt9maKCyWj+VooKauVXo/nsa3TZ+WyReabCGIl29jBFBePQfK1CzqWoYA6a11UmYBjeQ3Mu31BqFTIKzV9LUcEkNP9jIbnAx1i9FDeh+Z0pCqRWIQ5mPU5NUYG/J5fRAVaTCzmfooKFaP5QigKpVcifMhiv4NoUFcxG2z+RokDqVUgtGlbIcGyKQvpgUxQyCDt8IVPwPtqRfyMIL2QivkU7eYpLMYLQQnqjg7eDA+gGL4rQQlrRxs+im75IQgu5hDY+LUWxhBbiIcltuGeMaMIK8fNhw69SFE9YIZ4LnA1txHk7dGk9Qhsfk6JYQgvxYsHG16UoltBCFqGN38ToC4LQQnriM7SDuSYCCS1E1qAdXMfIWcln+eMpCsBvrHxtEzkrK9A+9qUoiOUYPSs70D68mQzDfZa3g1Gz4m9WnvUJJiKxADvyYOVpsZ54EWHbtzH62zFxBu3wKPYwUQe8HvJy23ZnmmgEI/A52ukF/JdffDeizoT3vra3HRvKaMzr2X3YSdyCi3HBb7gSd6NL1DZ0G0afd35KX9yD+d38W90xzMB2pz8uw114EN2b/cq9uBHHY0M+2CUlJSUldaSl5Tv4zOmPUWh7YwAAAABJRU5ErkJggg==','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALqSURBVGhD7ZlL6A1RHMevt5BHHnllgZL3TikkQpHHwsZjQVjYyiMrZYEsiIV3NmSDhUd/VixsbAhFeYfyWFD8Q17x+c6Zc5s7Hf1dM2fm3JpPfZpzbt3bfO+c38w5Z2oVFa3JGByPnaNeCzIOb+Pv2Cc4DVuKHngfL+AoHILH8Q0OwOAZFB9n4nfsG/UMXfE1rsVtqJCHcCoGQSfcjB9QQ+glnsEXmOYG/kINs33Yht9wHpbORvyE63ASbsEf+Lcgj7F31DPsxUemWS4PUCef5DC6guxEDa0kE1FXcmDUKxENldmmWWc0LjLNDtHNQEF0LBWdxAzTrDMFd5tmA5twjmnWSQbpFVsKriC63S41zQbmoh6QSWyQq/gTVV/nsfCh5grSDV1DZTgmC13YIHdQt215F89hobiCzMIrptnAEVxtmnVskORv6Pu6MoUOM1eQrNhwrqvqDVeQZopd05lT8dESTJBmil2z4vXx0RJMkGaKXYyNj5ZggjRT7CroV/HREkyQrAQTpCr2mGCCVMUek3uQLqiTXIOLsT+mcQXJSq5BpuND1A9qra01eDtuRS1vLUEHmY9f8BiqcEVP1JVRmINowwQd5BJqM2Fw1GtEJ/0ZtXkggg6iwruJWhf00wcptLRVmF0YdBChPap7qJ2P5B3FouH3FYMPIkbiU7yM3fVBioWofanggwg9rN7iaXRtRC/DvPd0vQQRk1F3seVRzz/egogDqJrRQ9I3XoMMRW2Nboh6fvEaRGxH1Utyl90H3oPo6f4M90c9f3gPIhagdgTT+715MgEVxE6PvKEXNJp6D4t6+bMEdZdMTk69oGWppjDS9dTPykm8aJr+GYHP8Rr20Qc5oTfA2i7VFKgwVIx623QLNa6zoj9Hb7TORr2C0VRfrwE0gdQbqf+5OnpRuhK1gNMV9jFc/5lV+A4/4nU8gUc7ULWgF6LvUQu2HaiNi9LRP7kCtehynbjLPajvuPYDKioqcqNW+wMkWMAxXNmXsgAAAABJRU5ErkJggg==',]
possibilities[2]='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATySURBVGhD7ZlprF9DGIevLWIJaoul9ogiog0iYg9iadQHS4JaW1uINqpI7QlfJITYI4hUIpEoidpCQkiIFkWJtWlQGjsVey3Pc+6dmnvunHvmnP8/+uX8kif3P3PmvGdmzjvvvHPuQKdOnTp16tSp0/+m1WEfuBRuHfo7FvqiVWEXOBk0fBGcCJtBr7Lje4N2n4Kf4J8S1h0ErbQhnAQPwldQNi5/w3NgR3K1GuwFM+EJWAZlm2/DLXAOPATWvwFZWgUmwBXwMiyH+AEfgIO6EW6AOfADeM22Z0NKdnwPmAGPw48Q27Xj74BudCxsDLG838H6jLWsqNLBcB8shfgBP4MzdgHsAClp+Br4C+zQEaAb7g7T4DH4HmK78i7cDsfDplCnL8H7yoMstB74oPgBH4MzcxSsDbmaDt7/LXwz9DvGt3k3uK42hyY6D7Rh30bI1/U82MCHz4Jx0Fa+hcUQOv4R3AMGhy2gqfSAi+E1CDZPgBG6ELz4HexoRR/k2tHmVUWpmVyfe8J1sBBC5+VzOA6S+gxspI/2S8EF7ihK9VoDDoXb4FOIO/813A9Hg+0qZWMHo4v1S0eCdp8sSmmtC86u0U9viDuva94M7hfZ/fJGR9xUG8A6gz9HaCfQ7ntF6T8ZlaaCofdXiDu/AIx646GVNHLt4M8sOYDr4Reo2pjWBEPwb6DPHwIvgaE5dNy9wCBjlNsOepZGLxv8WatTQZ8NnZFtIKWw9raER4Z+x/wOLuaHwYVtOHazrHrLtdJo7kDCRvksGFb9fQak5Bvw+n6gS00Bs4C54D5QzhYCvslP4BlwnZwLrpXaXM6bcwfijB0AkyE8eDakZL3XbZuS7ueub7Q0TJtH6aq6bLBdxqDwChjddNdhskHuQNRhoFsE48b2lFx3Xr+yKOXLDXVbMMUxszYLeBFSyarZyIqcy4qcgZhia/gP8J6rIayDnaGs08FrbSJilTYCXfVyCDnXTVCobiDmWafBm2DbP8EkUD0A1p1flIZLF/TaF+CCrsJ9RHvuK01k6uJ68nziW6wciGnCCxC7kYNxRoKMYtYblcraGsJ9OZhMNs3FHISDKdxLI6mBBB938ZnCuyjdE2J57LSNyWYxK5Ese83oZPpRhWHXBWxbN1AzbteVrmmGsBuk0vuQPbxflJCF1ECMKvtCXQrvTGrDIBDL/cV6Q3adxkDqWBujZ5iHedB7FXRx683rClnIWexVCtmzR1IXo1ofzLOsN4XPkXuL7T1G6A33gnuO7uxk6EJeDzgwN9IVuZiVvQzEN/chaMdj6DwIR1hDszt7nSaBHU0emIZk5qstvwnoKU7WMPU6ELUVPA3aitHtzAJGYz6EHOwUaC0NNN20qnQXxAPJxWBxFvQkDd05+LMn7Q/a8kPFJZCKUIFjwLdh+7egL2chjY3mm7ky/9GWZ4ocmeX6Jryn6UeIpMw0NTaxKLWX0Uk7bpK5ct/wnu2LUo/SNzW2CDaxoqX8SqIdY/yIiJKQx9y6SNVIJoOmInbC0Nnmk40yPLqXaMfw+zr4CSeF0SzsC05A3+Sb8Iufhv2o5mJtMyDtPArlzSuFzzkT+i7dwWw0PMjOLAEPO6lZTeEbcReOz+baMUIdDh7MxO9n5dys7zoQPK2Fj9Jt8AuJOZERbFdYqTLT9ZzscTTMZB3+38QEsFOnTp06jaKBgX8BYNbZ+2P3L60AAAAASUVORK5CYII='
let All_Images=document.querySelectorAll('.ImagesAll')

//Destruction array

let [rock,paper,scissor]=possibilities
let randomNumber=''

function results(){
  if(imageUser.src===imageComp.src){
    resultsH1.textContent='Draw'
    resultsH1.style.color='grey'
  }
 if((imageUser.src===rock&&imageComp.src===scissor)||(imageUser.src===scissor&&imageComp.src===paper)||(imageUser.src===paper&&imageComp.src===rock)){
  resultsH1.textContent='You Won'
  resultsH1.style.color='green'

 }
 if((imageUser.src===scissor&&imageComp.src===rock)||(imageUser.src===paper&&imageComp.src===scissor)||(imageUser.src===rock&&imageComp.src===paper)){
  resultsH1.textContent='You Lost'
  resultsH1.style.color='red'
 }
}
All_Images.forEach((img)=>{
  setTimeout(() => {
    img.addEventListener('click',function(e){
      randomNumber=Math.trunc(Math.random()*3)
    
       imageUser.src=e.target.src
       imageComp.src=possibilities[randomNumber]
       imageUser.src=e.target.src
       results()
  },500)
   })
})
//SlideShow/////////////////

let next=document.querySelector('.previous')
let previous=document.querySelector('.next')
let ImagesSlide=document.querySelectorAll('.imageSlide')

let transformation=0

next.addEventListener('click',function(){

  if( transformation===400){
    transformation=0
  }
  else{
  transformation= transformation+200
  }
  ImagesSlide.forEach((Img,i)=>{
 Img.style.transform=`translateX(${i*100- transformation}%)`
    console.log(1)
  })
})
previous.addEventListener('click',function(){

  if( transformation===0){
    transformation=400
  }
  else{
    console.log(transformation)
  transformation= transformation-200
  }
  ImagesSlide.forEach((Img,i)=>{
 Img.style.transform=`translateX(${i*100- transformation}%)`
    console.log(1)
  })
})
//SlideShow/////////////////