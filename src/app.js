import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import express from 'express';
import hbs from 'hbs';

import { weather } from './utils/weather.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5000;


const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Smath Cadet"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "Here we can provide any help you want"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Smath Cadet"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        });
    }

    weather(req.query.address, (error, { currentTemp } = {}) => {
        if (error) {
            return res.send({ error });
        }

        res.send({
            currentTemp,
            address: req.query.address
        });
    });

    // res.send({
    //     forecast: "It is raining",
    //     location: "Port-au-Prince",
    //     address: req.query.address
    // });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Smath Cadet',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Smath Cadet',
        errorMessage: 'Page not found.'
    });
});




app.listen(PORT, () => console.log(`Server up on port ${PORT}`));