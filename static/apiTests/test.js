$(function () {

  var fourSqKeys = {
    clientID: 'QMOH1J3ZMHNQ3S0QXLMWNUEFT21MPWA3QFCICLGPH3KNVBDZ',
    clientSecret: 'TVGUZRAN2S11NGM20REJTF2TFB4DLE4JVTQH5DPVBJ4CWUJO'
  };

  var location = 'Paris, France';
  var keyword = 'coffee';
  var queryStr = `https://api.foursquare.com/v2/venues/explore?client_id=${fourSqKeys.clientID}&client_secret=${fourSqKeys.clientSecret}&v=20180323&limit=1&near=${location}&query=${keyword}`;

  // ! FourSquare API Call Test
  $.get(queryStr, function (data) {
    console.log(data);
  });

  fetch('https://api.foursquare.com/v2/venues/explore?client_id='
    + fourSqKeys.clientID +
    '&client_secret=' +
    fourSqKeys.clientSecret +
    '&v=20180323&limit=1&near=' + location + '&query=coffee')
    .then(function () {

      // ! See Response Structure on POSTMAN
      // * FSQ Category IDs
      // https://developer.foursquare.com/docs/resources/categories


    })
    .catch(function () {
      // Code for handling errors
    });

  // ! Unsplashed API Call Test

  var unsplKeys = {
    accessKey: '0835aa91744ff770da738c90338caf0cc765e0799c60ec1ff42ba91f216a0ab0',
    secreyKey: 'afcf814b6ea355cfbdb5c545697ba68857d9d1898355daaa59b4535698510e9b'
  };

  fetch('https://api.unsplash.com/search/photos/?client_id=' + unsplKeys.accessKey + '&query=' + location).then(function () {
    // Stuff
  }).catch(function () {
    // Stuff
  });

});