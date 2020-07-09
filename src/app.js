const express = require('express')
const path = require('path')
const hbs = require('hbs')
const gc = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const templatePath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Set handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialPath)

// swet up static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Seb Gazolla Jr'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Seb Gazolla Jr'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'help!',
        msg: 'This is the help message',
        name: 'Seb Gazolla Jr'
    })
})

app.get('/weather', (req,res)=>{
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address.'
        })
    }
    gc.geoCode(req.query.address, ( error, address )=>{
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(address.lat, address.long, (error, forecast)=>{
            if (error) {
                return res.send({
                    error: error
                })
            }
            return res.send({
                location: address.place,
                forecast,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req,res)=>{
    res.render('404page',{
        title:'404 - Help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404page',{
        title:'404 - page not found'
    })
})
app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})

