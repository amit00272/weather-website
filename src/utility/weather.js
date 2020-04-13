const request = require("request")


var weather =  (long, lat, callback) => {

    const weatherurl = "http://api.weatherstack.com/current?access_key=292c824fff053aaebf6ba47ebdda66bc&query="+lat+","+ long+"&units=f"
    
    request( {url : weatherurl, json : true }, (err, response) => {

        if(err) callback("Unable to connect to weatherstack", undefined)
        else if(response.body.error) callback(response.body.error.info, undefined)
        else{ 

            var bd = response.body;
        callback (undefined,{
            "forcast": bd.current.weather_descriptions[0] + " . it is currently "+ bd.current.temperature+ " here .there is "+bd.current.cloudcover+"% chance of rain.",
            "location": bd.location.name+", "+bd.location.region+", "+bd.location.country
        });

     }
    
    })
}


module.exports = weather