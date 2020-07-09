const request = require('postman-request')

const forecast = (lat,long, callback)=>{  
    const url = `http://api.weatherstack.com/current?access_key=2bd14254aaac156dcc60c69acf361c2c&query=${lat},${long}`

    request({url:url, json:true}, (error, response, body)=>{
        if (error){
            callback('Enable to connect to weather service', undefined)
        } else if (body.error){
            callback('Enable to find location', undefined)
        } else {
            callback(undefined, `${response.body.current.weather_descriptions[0]} - Is is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip}% chance of rain.`)
        }
    })
}

module.exports = forecast

