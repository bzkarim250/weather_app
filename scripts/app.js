//DOM manupilation
const cityForm=document.querySelector('form');
const card=document.querySelector('.card');
const details=document.querySelector('.details');
const time=document.querySelector('img.time');
const icon=document.querySelector('.icon img')

const updateUI=(data)=>{
    // const cityDets=data.cityDets;
    // const weather=data.weather;

    //Destructure properties
    const {cityDets,weather}=data;

    //updating template details
    details.innerHTML=`
        <div class="details">
        <h5>${cityDets.EnglishName}</h5>
        <div>${weather.WeatherText}</div>
        <div>
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
        </div>
    `
    //update day/night img&icons
    const iconSrc=`./img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    let timeSrc=null;
    // if(weather.IsDayTime){
    //     timeSrc='./img/day.jpg';
    // }else{
    //     timeSrc='./img/night.jpg';
    // }
    timeSrc=weather.IsDayTime?'./img/day.jpg':'./img/night.jpg';
    time.setAttribute('src',timeSrc);


    //remove class d-none if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

const updateCity=async(city)=>{
    const cityDets=await getCity(city);
    const weather=await getWeather(cityDets.Key);
//we can call those functions because index.html fcst is defined before app.js
        //using Short hand object notation
    return{cityDets, weather};
}

cityForm.addEventListener('submit',e=>{
    //prevent default action
    e.preventDefault();
    //get city
    const city=cityForm.city.value.trim();
     //clear the form
    cityForm.reset()
    //update UI with city
    updateCity(city)
    .then(data=>updateUI(data))
    .catch(err=>console.log(err));

    //storing data to local storage
    localStorage.setItem('city',city);
});

//checking the city from local storage
if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
                            .then(data=>updateUI(data))
                            .catch(err=>console.log(err));
}
