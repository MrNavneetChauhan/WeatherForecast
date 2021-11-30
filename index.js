let key = `7af00bd53abead2a36e79189cbb58eed`
let btn = document.getElementById("enter")
let container = document.querySelector(".container")
let mapContainer = document.querySelector(".mapcont")
let temp = document.createElement("img")
temp.setAttribute("id","temp")
temp.src = "https://www.clipartmax.com/png/middle/129-1295102_weather-forecast-icon-partially-cloudy-png.png"
let h1 = document.createElement("h1")
h1.textContent = "Weather forecasting of 7 days, use the search field"
let anothertemp = document.createElement("img")
anothertemp.setAttribute("id","anothertemp")
anothertemp.src = "https://media1.giphy.com/media/H6huqjLjL8K3iF3Dec/giphy.gif"

container.append(anothertemp)
mapContainer.append(temp,h1)
async function showDetails(){
    mapContainer.textContent = ''
    let search = document.getElementById("search").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`
   
    let iframe = document.createElement("iframe")
    iframe.src = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${search}!6i13`

    mapContainer.append(iframe)

    let res = await fetch(url)
    let data = await res.json()
    // console.log(data)
    let lat = data.coord.lat;
    let long = data.coord.lon;
    let exclude = "minutely,hourly"
    let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${key}`
    // console.log(url2)

    let res2 = await fetch(url2)
    let finalData = await res2.json()
    let arr = finalData.daily;
    displayData(arr)
}
// let dayName = []
function displayData(arr){
    container.textContent = "";
    arr.map(function(item){
    //    console.log(item.Name)
        // console.log(item.dt)
        const weekDay = new Date(item.dt * 1000).toLocaleString("en-us", {
            weekday: "long"
        });

       let weatherBox =  document.createElement("div");
       let img = document.createElement("img")
       img.setAttribute("id","weatherImg")
       if(item.weather[0].main === "Clear"){
           img.src = "https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clear-icon.png"
           
       }else if(item.weather[0].main === "Clouds"){
           img.src = "https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-snow-scattered-day-icon.png"
       }else if(item.weather[0].main === "Rain"){
           img.src = "https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-showers-icon.png"
       }else{
           img.src = "https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-showers-scattered-day-icon.png"
       }

       let dayName = document.createElement("h4")
       dayName.textContent = weekDay
       let name = document.createElement("h4")
       name.setAttribute('id',"name")
       name.textContent = search.value

       let minTemp = document.createElement("h4")
       let maxTemp = document.createElement("h4")

       minTemp.setAttribute("class","temp")
       maxTemp.setAttribute("class","temp")

        minTemp.innerHTML = `<h4>Night</h4>${Math.floor(item.temp.night-273)}°C `
        maxTemp.innerHTML = `<h4>Day</h4>${Math.floor(item.temp.day-273)}°C `





    //    if(item.)
       weatherBox.setAttribute("id","weatherBox")
       weatherBox.append(dayName,img,name,maxTemp,minTemp)
       container.append(weatherBox);



    })
}

btn.addEventListener("click",showDetails)


