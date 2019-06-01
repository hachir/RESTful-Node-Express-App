var unirest = require('unirest')
var apiKey = '18efb75998mshb71d1629b10bb3fp1dadf0jsn73fbf7500568';
var postUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0`
// var getUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${sessionKey}`;



function getSession(sessionKey, cb) {
    unirest.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${sessionKey}?pageIndex=0&pageSize=10`)
        .header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", apiKey)
        .end(function (result) {
            // console.log(result.body);
            cb(result.body.Itineraries);
        });

}



module.exports = {


    startSession: (info, cb) => {


        unirest.post(postUrl)
            .header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", apiKey)
            .header("Content-Type", "application/x-www-form-urlencoded")
            .send(info.inboundDate)
            .send(info.flightClass)
            .send(info.country)
            .send(info.currency)
            .send(info.locale)
            .send(info.origin)
            .send(info.destination)
            .send(info.outboundDate)
            .send(info.adults)
            .end(function (result) {
                console.log(result.status, result.headers, result.body);
                if (result.status >= 200 && result.status <= 300) {
                    var sessionKey = result.headers.location.slice(64);
                    console.log(sessionKey);
                    getSession(sessionKey, function (data) {
                        cb(data);
                    })
                } else {
                    var error = 'Unable to retrieve results for this search';
                    cb(error)
                }

            });

    }





}