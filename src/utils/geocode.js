const request = require('postman-request')

const geoCode = (address, callback) =>{
    const locationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ2F6b2xsYSIsImEiOiJja2Jnc25zam0xOGV5MnludHA0bGhicnNwIn0.QX3awn7gJhRJafdG3-dq_w&limit=1`
    
    request({url:locationURL, json:true},(error, response, body)=>{
        if (error) {
            callback('Enable to connect to map service', undefined)
        } else if (body.features.length === 0) {
            callback('Enable to find location', undefined)        
        } else {
            const place = body.features[0].place_name
            const [long, lat] = body.features[0].center
            callback(undefined, { place,lat,long })
        }
    })
}

module.exports = {
    geoCode: geoCode
}