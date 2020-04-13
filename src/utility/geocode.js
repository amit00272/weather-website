const request = require("request")

var geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYW1pdDAwMjcyIiwiYSI6ImNrOHM3N2F0bDBnNjYzcHA2d2htZzU2bnEifQ.VutRGLelgz-7-wZUGmO-Kg&limit=1"
    request ( {url, json : true }, (error, response) => {

         
        if(error) callback("Unable to connect to mapbox", undefined);
        else if(response.body.message) callback("Unable to find the location", undefined);
        else {

            let data = response.body.features[0];
            callback(undefined, {
                long: data.center[0],
                lat: data.center[1],
                place: data.place_name,
            } );
        }

    })

}

module.exports =  geocode