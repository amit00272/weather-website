const path = require('path')
const express =  require('express')
const hbs = require('hbs')
const geocode = require("./utility/geocode")
const weather = require("./utility/weather")


const app = express()

const port = process.env.PORT || 3000 

const publicDirectoryPath =  path.join(__dirname, '../public')
const viewsDirectorypath =  path.join(__dirname, '../templates/views')
const partialsDirectorypath =  path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectorypath)

hbs.registerPartials(partialsDirectorypath)

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title : "Home",
        text : "welcome to home page" 
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : "Help",
        text : "welcome to help page" 
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : "About",
        text : "welcome to About page" 
    });
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address)
        return res.send({error: "Adress is required to get weather codition"})

    geocode(req.query.address, (error, response) => {

            if(error) return res.send({error})
            weather(response.long, response.lat, (error, response) => {
                   
                if(error) return res.send({error})
                 // console.log(response)
                 return res.send({
                     "forcast": response.forcast,
                     "location":response.location,
                     "address":req.query.address

                 })
            })
        })   


})

app.get('/help/*', (req, res) => {

    res.render('404.hbs', {
        title : "404",
        errorMessage: 'No help article found for this' 
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title : "404",
        errorMessage: 'Ops! this page is not avaible' 
    })
})

app.listen(port, () => {
    console.log('Server has started on port ' + port)
})
