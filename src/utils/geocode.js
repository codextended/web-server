//  const request = require('request');
import request from 'request';
 
 export const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic21hdGhjYWRldCIsImEiOiJja3F2aGxqM3IwZWwzMm9wYTdmM245YjJ1In0.oD-SBX__qcKg_crEW5kpuA&limit=1';

    request({  url, json: true }, (error, {body}) =>{
        if (error) {
            callback('Unable to connect location services.', undefined);
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
};