// inputs
let search_form = document.querySelector('.search_cont')
let city_name_inp = document.querySelector('#city_name')
let current_city = ''
// outputs
let humidity_o = document.querySelector('#humidity')
let wind_speed_o = document.querySelector('#wind_speed')
let temp_o = document.querySelector('#temp')
let snow_o = document.querySelector('#snow')
let city_name = document.querySelector('.info h2')

async function get_weather(city_name) {
    let data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city_name}?key=8SHJ59M8JY8LVFA7EDNANEZK7`)
    try {
        
        data = await data.json()
    } catch (error) {
        console.error(data);
        
    }

    return data
}


search_form.onsubmit = (e)=>{
    e.preventDefault()
    let city_name = city_name_inp.value
    console.log(city_name);
    
    get_weather(city_name)
    .then((data)=>{
        console.log(data);
        refresh_info(data)
    })
}

function refresh_info(city){
    let humidity = city.currentConditions.humidity
    let wind_speed = city.currentConditions.windspeed
    let temp = city.currentConditions.temp
    let snow = city.currentConditions.snow

    city_name.textContent = city_name_inp.value
    humidity_o.textContent = humidity + '%'
    wind_speed_o.textContent = wind_speed + 'm/s'
    temp_o.textContent = ((temp - 32) / 1.8).toFixed() + '°C' 
    snow_o.textContent = Number(snow) + ' mm' 
}
