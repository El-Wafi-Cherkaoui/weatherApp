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
        loading_screen('1')
    } catch (error) {
        error_logo('show')
    }

    return data
}


search_form.onsubmit = (e)=>{
    e.preventDefault()
    error_logo()

    loading_screen('0')

    let city_name = city_name_inp.value    
    get_weather(city_name)
    .then((data)=>{
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
function loading_screen(opacity) {
    let loading_logo = document.querySelector('#loading')
    if(opacity == '0') loading_logo.style.display = 'block'
    else loading_logo.style.display = 'none'

    document.querySelectorAll('.info *').forEach(element => {
        element.style.opacity = opacity
    });
}
function error_logo(state = '') {
    if(state == 'show'){
        document.querySelector('#loading').src = './imgs/error.png'
    }
    else{
        document.querySelector('#loading').src = './imgs/loading.gif'
    }
}