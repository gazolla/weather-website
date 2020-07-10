

const search = (address, callback)=>{
    fetch(`/weather?address=${address}`).then((response)=>{
        response.json().then((data)=>{
            callback(data)
        })
    })
}


const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const address = searchEl.value

    const weatherEl = document.querySelector('#weather-div')
    weatherEl.innerHTML = ''
    
    search(address, (data) => {
        if (data.error){
            renderError(data.error)
        } else {
            renderWeather(data)
        }        
    })
})

const renderError = (data) => {
    const weatherEl = document.querySelector('#weather-div')
    let errorEl = document.createElement('h4')
    
    errorEl.textContent = data

    weatherEl.appendChild(errorEl)
}

const renderWeather = (data) => {
    const weatherEl = document.querySelector('#weather-div')
        
    const imgEl = document.createElement('img')
    imgEl.src = data.forecast[0]

    const locationEl = document.createElement('h2')
    locationEl.textContent = data.location

    const forecastEl = document.createElement('h4')
    forecastEl.textContent = data.forecast[1]

    weatherEl.appendChild(imgEl)
    weatherEl.appendChild(locationEl)
    weatherEl.appendChild(forecastEl)
}