/////run npm install to fire it up
const express = require('express');
const app = express();//...
const path = require('path');
const hbs = require('hbs');
const axios = require('axios');
// const dotenv = require('dotenv')
let countryCodeList = [];
// require('dotenv').config();


const viewsPath = path.join(__dirname, '/views' )
const partialPath = path.join(__dirname, '/views/incParsels')
hbs.registerPartials(partialPath)

app.set('view engine', 'hbs')//....

app.set('views', viewsPath);///....

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const publicDirectory = path.join(__dirname, '/public');///

app.use(express.static(publicDirectory));


app.get('/noWeather', (req, res) => {
    res.render('noWeather')
})

// app.get('/test', (req, res) => {
//     res.render('test')
// })

app.get("/test", async (req, res) => {
    const countryCode = await axios.get("https://restcountries.eu/rest/v2/all");
    console.log(countryCode)
    countryCodeList = countryCode.data.map(country => {
        return (
            { name: country.name, alpha: country.alpha3Code }
        )
    });
    res.render("test", { list: countryCodeList })
});


app.post('/test', async (req, res) => {


    const cityName = req.body.city;
    const countryName =req.body.countryCode;
    
    
    try {

        const myApi = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=165a0185527a6181c00190f0e678978c&units=metric`);
        
        console.log(myApi.data)   
        
        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
          }
         let date = new Date();

         
        res.render('test', {
           
            city: myApi.data.main.temp + "°",
            weather: myApi.data.weather[0].description,
            date: myApi.data.dt = new Date(),
            icon: myApi.data.weather[0].icon,
            cityName: myApi.data.name,
            list: countryCodeList
            });

    } catch (error) {
        res.render('noWeather')
        console.log(error)
    }

});



app.get('/7days', async (req, res) => {

    // lat  53.4808
    // long 2.2426
    const latitude =  53.4808
    const longitude = 2.2426

    // const latitude = req.query.latitude
    // const longitude = req.query.longitude
    
    console.log(latitude);
    console.log(longitude);

    
    try {
         
        const myApi7 = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={hourly,daily}&appid=165a0185527a6181c00190f0e678978c&units=metric`);
        console.log(myApi7.data)    
        // console.log(myApi7.data.daily[0].dt)
        res.render('7days', {
            
            latitude: myApi7.data.lat,
            longitude: myApi7.data.lon, 

            // day1Time:myApi7.data.daily[0].dt,
            day1:myApi7.data.daily[0].temp.day,
            dayone:myApi7.data.daily[0].weather[0].icon,
            day1one:myApi7.data.daily[0].weather[0].description,


            day2:myApi7.data.daily[1].temp.day,
            daytwo:myApi7.data.daily[1].weather[0].icon,
            daytwo2:myApi7.data.daily[1].weather[0].description,

            day3:myApi7.data.daily[2].temp.day,
            daythree:myApi7.data.daily[2].weather[0].icon,
            daythree3:myApi7.data.daily[2].weather[0].description,

            day4:myApi7.data.daily[3].temp.day,
            dayfour:myApi7.data.daily[3].weather[0].icon,
            dayfour4:myApi7.data.daily[3].weather[0].description,

            day5:myApi7.data.daily[4].temp.day,
            dayfive:myApi7.data.daily[4].weather[0].icon,
            dayfive5:myApi7.data.daily[4].weather[0].description,


            day6:myApi7.data.daily[5].temp.day,
            daysix:myApi7.data.daily[5].weather[0].icon,
            daysix6:myApi7.data.daily[5].weather[0].description,

            day7:myApi7.data.daily[6].temp.day,
            dayseven:myApi7.data.daily[6].weather[0].icon,
            dayseven7:myApi7.data.daily[6].weather[0].description,

           
            
          

        });

    } catch (error) {
        res.render('noWeather')
        console.log(error)
    }

});




app.get("*", (req, res) => {////....always has to be last
    res.send("<h1>sorry wrong details</h1>")
});


app.listen(5000, () => {
    console.log("server is running on port 5000")
});





// const showLocalTime = (time, utcShift) => {
//     let currentTimeUnix  = unixTime + utcShift;
//     let currentDate = new Date(currentTimeUnix * 1000);
//     let currentHours = "0" + currentDate.getHours();
//     let currentMinutes = "0" + currentDate.getMinutes();
//     let currentTime = `${currentHours.substr(-2)}:${currentMinutes.substr(-2)}`;
//     return currentTime;
// }


// test.data.daily.forEach((day, index) => {
//     let date = new Date(day.dt * 1000);
//     let dayString = date.toString().split(' ')[0];
//     let month = date.toString().split(' ')[1];
//     let daynum = date.toString().split(' ')[2];
//     let year = date.toString().split(' ')[3];
//     test.data.daily[index].dt = `${dayString} ${month} ${daynum} ${year}`;
//     test.data.daily[index].icon = test.data.daily[index].weather[0].icon;

//     daily: test.data.daily
