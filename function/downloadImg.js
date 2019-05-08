var fs = require('fs'),
  request = require('request');

module.exports = function (uri, filename, callback) {
  return new Promise((resolve) => {
    if (uri.search(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g) > -1) {
      console.log(uri)
      return
    }
    else {
      request.head(uri, function (err, res, body) {
        if (!res) {
          console.log(uri)
          return
        }
        // console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        resolve()
      });
    }
  })
};

// download('http://nova.vn/img/products/294400329500GB_WESTERN_WDS500G2B0B_M2.jpg', '../img/294400329500GB_WESTERN_WDS500G2B0B_M2.jpg', function () {
//   console.log('done');
// });