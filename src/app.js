const { hasSubscribers } = require('diagnostics_channel')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express  configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine & views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hasan Raza'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather',
        name: 'Hasan Raza'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Weather application help FAQs',
        name: 'Hasan Raza'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        error: 'Help article not found',
        name: 'Hasan Raza'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        error: 'Page not found',
        name: 'Hasan Raza'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
