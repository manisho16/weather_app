
console.log("success")
const api_key="9f7ff6ab531440f494d90511242308"
const base="https://api.weatherapi.com/v1/"

let input=document.querySelector("input");
const temp=document.querySelector("h1");
const big_loc=document.querySelector("#big");
const small_loc=document.querySelector("#small");
const humidity=document.querySelector("#humidity");
const wind_speed=document.querySelector("#wind");
const e=document.querySelector("#search_icon");
e.addEventListener('click',find)

input.addEventListener('keypress',(k)=>{
    if(k.code==='Enter'){
        console.log("key pressed")
        find()
    }
})

let isday;
function day(isDay){
    if(isday==2){
        document.querySelector(".card").style.background="linear-gradient(225deg,rgb(186, 106, 224),rgba(35, 159, 161, 0.984))";
    }
    else if(isday==0){
        document.querySelector(".card").style.background="linear-gradient(180deg,rgb(70, 70, 70),rgb(10, 16, 17))";
        document.querySelector("button").style.boxShadow="1px 1px 10px rgb(240, 214, 214)";
        document.querySelector("body").style.textShadow="1px 1px 3px rgb(162, 160, 141)";
        
    }else{
        document.querySelector(".card").style.background="linear-gradient(180deg,rgb(241, 233, 118),rgba(117, 70, 4, 0.845)";
        document.querySelector("button").style.boxShadow="1px 1px 10px rgb(2, 2, 2)";
        document.querySelector("body").style.textShadow="1px 1px 3px rgb(27,25,25)";
    }
}

function find(){
    
    const doc=input.value.trim();
    if(doc !== ""){
        const url=`${base}current.json?key=${api_key}&q=${doc}&q=india`;
        fetch(url)
            .then(response=>response.json())
            .then(data=>{
                
                temp.innerText=`${data.current.temp_c} °C`
                big_loc.innerText=`${data.location.country}`
                small_loc.innerText=`${data.location.name}`
                humidity.innerText=`${data.current.humidity} %`
                wind_speed.innerText=`${data.current.wind_kph} km/h`
                isday=data.current.is_day
                day(isday)
                isday=2;

                //splitting the string and getting the 1st index element which is time
                const local_time=data.location.localtime.split(' ')[1];
                document.querySelector("button").innerText=local_time;
                console.log(data)
                document.querySelector(".content").style.display="block";
                document.querySelector(".error").style.display="none";
                
            })
            .catch(error=>console.log(error.message));
    }
    else{
        day(2)
        temp.innerText=`°C`
        big_loc.innerText=`--`
        small_loc.innerText=`--`
        humidity.innerText=`--`
        wind_speed.innerText=`--`
        document.querySelector("button").innerText=` `;
        console.log("input not present")
        document.querySelector(".error").style.display="block";
        document.querySelector(".content").style.display="none";
    }   
}


//https://api.weatherapi.com/v1/current.json?key=9f7ff6ab531440f494d90511242308&q=pune&q=india
