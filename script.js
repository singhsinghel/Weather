let btn=document.querySelector('button');
let input=document.querySelector('input');
let h1=document.querySelector('h1');
let date=document.querySelector('.date');
let time=date.nextElementSibling;
let h2=document.querySelector('h2');
let speed=document.querySelector('.speed');
let direction=speed.nextElementSibling;
let realFeel=document.querySelector('.real');
let humidity=document.querySelector('.hum');
let pressure=document.querySelector('.pressure');
let lat=document.querySelector('.lat');
let long=lat.nextElementSibling;
let tempMax=document.querySelector('.max');
let min=tempMax.nextElementSibling;
let sunRise=document.querySelector('.rise');
let sunset=sunRise.nextElementSibling;
let grnd=document.querySelector('.grnd_level');
let sea=grnd.nextElementSibling;
let visible=document.querySelector('.visible');
let img=document.querySelector('.img');
let daynight=document.querySelector('.day');
let weather=img.nextElementSibling;
let data=document.querySelector('.data');





async function fetch(){
    data.style="left:0rem";
    let result= await getdata();
    console.log(result);

    let temp= await result.main.temp;
    let temp_cels=parseInt(temp-273.15);
    h1.innerText=`${temp_cels} ${'\u00B0'}c`;

    speed.innerText=`${result.wind.speed} km/h`;
    direction.innerText=`${result.wind.deg} deg`;
    
    humidity.innerText=`${result.main.humidity} %`;

    temp= await result.main.feels_like;
    temp_cels=parseInt(temp-273.15);
    realFeel.innerText=`${temp_cels} ${'\u00B0'}C`;
    
    pressure.innerText=`${result.main.pressure} hPa`;


    lat.innerText=` Lat- ${result.coord.lat} ${'\u00B0'}  `;
    long.innerText=`Lon- ${result.coord.lon} ${'\u00B0'}  `;

    temp=await result.main.temp_max;
    temp_cels=parseInt(temp-273.15);
    tempMax.innerHTML=` <p class="max"><i class='bx bx-up-arrow'></i> ${temp_cels} ${'\u00B0'}C </p>`;

    temp=await result.main.temp_min;
    temp_cels=parseInt(temp-273.15);
   min.innerHTML= `<p><i class='bx bx-up-arrow bx-rotate-180'></i>${temp_cels} ${'\u00B0'}C </p>`;
    min.append(``);

   
    h2.innerText=`${result.name}, ${result.sys.country}`;

    sunrise(result);

    grnd.innerText=`${result.main.grnd_level} mb`;
    sea.innerText=`${result.main.sea_level} mb`;

    visible.innerText=`${result.visibility} mtrs`;
    
    image(result);
    
}

function image(result){
    let icon=result.weather[0].icon;
    console.log(icon)
    img.src=`https://openweathermap.org/img/wn/${icon}@2x.png`;
    weather.innerText=result.weather[0].description;
}

async function sunrise(result){

    let sunrise=await result.sys.sunrise;
    let milliseconds=sunrise * 1000;
    let dateObj=new Date(milliseconds);
    
    let hours=dateObj.getHours();
    let minutes=dateObj.getMinutes();
    let seconds=dateObj.getSeconds();
    sunRise.innerText= `Sunrise:  ${hours}:${minutes}:${seconds}`;

    let set=await result.sys.sunset;
    milliseconds=set*1000;
    dateObj=new Date(milliseconds);
    hours=dateObj.getHours();
    minutes=dateObj.getMinutes();
    seconds=dateObj.getSeconds();
    sunset.innerText= `Sunset:  ${hours}:${minutes}:${seconds}`;

    let newObj= new Date();
    let day=newObj.getDate();
    let month=newObj.getMonth()+1;
    let year=newObj.getFullYear();
    date.innerText=`${day}/${month}/${year}`;     // for date in left card
    hours=newObj.getHours();
    if(hours>=20||hours<=5)
    daynight.innerText='Night';
   else if(6<=hours<20) daynight.innerText='Day'
    minutes=newObj.getMinutes();
    time.innerText=`${hours}:${minutes}`;
}

btn.addEventListener('click',fetch);
document.addEventListener('keyup',(event)=>{
    if(event.code=='Enter')
    fetch();
})

async function getdata () {
    try {
        let city=input.value;
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3bebfdc0403f6eaa90b5170910d19e5`;
        let result= await axios.get(url);
        return result.data;
    } catch (error) {
        console.log("error has been occured")
        console.log(error);
        alert("Enter valid city");
    }
}

