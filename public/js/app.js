

const search = (address, callback)=>{
    fetch(`http://localhost:3000/weather?address=${address}`).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
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
        
    const locationEl = document.createElement('h2')
    locationEl.textContent = data.location

    const forecastEl = document.createElement('h4')
    forecastEl.textContent = data.forecast

    weatherEl.appendChild(locationEl)
    weatherEl.appendChild(forecastEl)
}