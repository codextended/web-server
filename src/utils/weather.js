import request from "request";

export const weather = (city, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+ encodeURIComponent(city) +'&units=metric&appid=02bddf0d08c7b3f6da6489a882c2f157';

    request({ url, json:true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services.', undefined);
        } else if (body.cod === '404') {
            callback('Unable to find location. Please try another location!', undefined);
        } else {
            callback(undefined, { 
                currentTemp: body.main.temp
            });
        }
    });
};