const request = require('request')
module.exports = {
  getCategory: (category, token) => {
    return new Promise((resolve) => {
      var options = {
        uri: encodeURI('https://api.ifonepc.vn/v1/product/category?name=' + category),
        headers: {
          'Authorization': 'bearer ' + token
        },
      }
      request.get(options, function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        resolve(JSON.parse(body).data.docs[0])
      });
    })
  },
  getBrand:(brand,token)=>{
    return new Promise((resolve) => {
      var options = {
        uri: encodeURI('https://api.ifonepc.vn/v1/product/brand?name=' + brand),
        headers: {
          'Authorization': 'bearer ' + token
        },
      }
      request.get(options, function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        resolve(JSON.parse(body).data.docs[0])
      });
    })
  },
  postProduct:(data,token)=>{
    return new Promise((resolve) => {
      var options = {
        uri: encodeURI('https://api.ifonepc.vn/v1/product/product'),
        headers: {
          'Authorization': 'bearer ' + token
        },
        json:data
      }
      request.post(options, function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        resolve(body)
      });
    })
  }

}


