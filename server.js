/////run npm install to fire it up
const express = require('express');
const app = express();//...
const path = require('path');
const hbs = require('hbs');
const axios = require('axios');

let countryCodeList = [];



const viewsPath = path.join(__dirname, '/views')
const partialPath = path.join(__dirname, '/views/incParsels')
hbs.registerPartials(partialPath)

app.set('view engine', 'hbs')//....

app.set('views', viewsPath);///....

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const publicDirectory = path.join(__dirname, '/public');///

app.use(express.static(publicDirectory));




app.get("/home", async (req, res) => {
    const countryCode = await axios.get("https://restcountries.eu/rest/v2/all");

    countryCodeList = countryCode.data.map(country => {
        return (
            { name: country.name, alpha: country.alpha3Code }
        )
    });
    res.render("home", { list: countryCodeList })
});


app.post('/home', async (req, res) => {


    const cityName = req.body.city;
    const countryName = req.body.countryCode;


    try {

        const myApi = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=165a0185527a6181c00190f0e678978c&units=metric`);

        // console.log(myApi.data)   

        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        let date = new Date();




        res.render('home', {

            temp: myApi.data.main.temp + "°",//................rename temp not city
            weather: myApi.data.weather[0].description,
            date: myApi.data.dt = new Date(),
            icon: myApi.data.weather[0].icon,
            cityName: myApi.data.name,
            list: countryCodeList
        });

    } catch (error) {

        const message = "PLEASE CHECK LOCATION DETAILS"

        res.render('home', {
            message: message
        })
        console.log(error)
    }

});



app.get('/7days', async (req, res) => {

    
    const latitude = 53.4808
    const longitude = 2.2426

    

    console.log(latitude);
    console.log(longitude);


    try {

        const myApi7 = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={hourly,daily}&appid=165a0185527a6181c00190f0e678978c&units=metric`);
        
        res.render('7days', {

            latitude: myApi7.data.lat,
            longitude: myApi7.data.lon,

            
            day1: myApi7.data.daily[0].temp.day,
            dayone: myApi7.data.daily[0].weather[0].icon,
            day1one: myApi7.data.daily[0].weather[0].description,


            day2: myApi7.data.daily[1].temp.day,
            daytwo: myApi7.data.daily[1].weather[0].icon,
            daytwo2: myApi7.data.daily[1].weather[0].description,

            day3: myApi7.data.daily[2].temp.day,
            daythree: myApi7.data.daily[2].weather[0].icon,
            daythree3: myApi7.data.daily[2].weather[0].description,

            day4: myApi7.data.daily[3].temp.day,
            dayfour: myApi7.data.daily[3].weather[0].icon,
            dayfour4: myApi7.data.daily[3].weather[0].description,

            day5: myApi7.data.daily[4].temp.day,
            dayfive: myApi7.data.daily[4].weather[0].icon,
            dayfive5: myApi7.data.daily[4].weather[0].description,


            day6: myApi7.data.daily[5].temp.day,
            daysix: myApi7.data.daily[5].weather[0].icon,
            daysix6: myApi7.data.daily[5].weather[0].description,

            day7: myApi7.data.daily[6].temp.day,
            dayseven: myApi7.data.daily[6].weather[0].icon,
            dayseven7: myApi7.data.daily[6].weather[0].description,





        });

    } catch (error) {
        res.render('noWeather')
        console.log(error)
    }

});


app.get("*", (req, res) => {
    res.send("<h1>sorry wrong details</h1>")
});


app.listen(5000, () => {
    console.log("server is running on port 5000")
});



