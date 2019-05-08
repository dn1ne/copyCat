const URL = "http://nova.vn/danh-muc-chinh/laptop--phu-kien-laptop--may-tinh-bang/66/"
//24
const getProduct = require('./function/getProduct')
const getProductDetail = require('./function/getProductDetail')
const getLinkList = require('./function/getLinkList')
const getProductImg = require('./function/getProductImg')
const download = require('./function/downloadImg')
const getCategory = require('./function/getCategory')
const request = require('request');
const getBrand = require('./function/getBrand')
const getApi = require('./function/getFromApi')
const fs = require('fs')
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTczMjA5NDcsImlhdCI6MTU1NzI3Nzc0Nywic3ViIjoiNWNjYmY0ODk4NmIyNjEwNDM4ODJkYjFlIn0.lEaFAHyWTREwGOckbayncQnaF0m7rph6c_jBZLRODcA'


function firstLetterUpper(theString) {
  var newString = theString.toLowerCase().replace(/(^\s*\w|đ|[\.\!\?]\s*\w)/g, function (c) { return c.toUpperCase() });
  return newString;
}


const asyncGetProductFunc = async () => {
  for (i = 11; i <= 24; i++) {
    const all = await getProduct(URL + i);
    console.log(i + '-' + all.length)
    for (j = 0; j < all.length; j++) {
      console.log('all[' + j + ']')
      await createProduct(all[j])
      await sleep(1200);
    }
  }
}

const sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const asyncGetCategoryFunc = async () => {
  var cateList = await getCategory()

  cateList.map((item, index) => {
    let options = {
      url: 'https://api.ifonepc.vn/v1/product/category',
      headers: {
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTcxNTA1MDUsImlhdCI6MTU1NzEwNzMwNSwic3ViIjoiNWNjYmY0ODk4NmIyNjEwNDM4ODJkYjFlIn0.LwcOHJB_zrXaAab8BedW7dRDYHkNViTVkCn9l8q_1Ng'
      },
      json: { name: item.name }
    }

    request.post(options, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('failed:', err);
      }
      let _id = body.data._id
      item.category.map((value) => {
        let opts = {
          url: 'https://api.ifonepc.vn/v1/product/category',
          headers: {
            'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTcxNTA1MDUsImlhdCI6MTU1NzEwNzMwNSwic3ViIjoiNWNjYmY0ODk4NmIyNjEwNDM4ODJkYjFlIn0.LwcOHJB_zrXaAab8BedW7dRDYHkNViTVkCn9l8q_1Ng'
          },
          json: { name: value, parent: _id }
        }
        request.post(opts, function optionalCallback(err, httpResponse, body) {
          if (err) {
            return console.error('failed:', err);
          }
          console.log(body)

        });

      })
    });
  })




}

const asyncGetDetailsFunc = async () => {
  var link = []
  for (i = 1; i <= 1; i++) {
    link = [...link.concat(await getLinkList(URL + i))]
  }
  console.log(link)
  let details = []
  await link.map(async (item, index) => {
    await getProductDetail(item).then((data) => {
      details.push(data)
    })
  })
}


const asyncGetProductImgFunc = async () => {
  var imgLink = []
  for (i = 1; i <= 2; i++) {
    imgLink = [...imgLink.concat(await getProductImg(URL + i))]
  }
  console.log("linkList: done")
  await imgLink.map(async (item, index) => {
    let fileName = item.slice(item.lastIndexOf('/') + 1)
    await download(item, './img/' + fileName, () => {
    })
  })
}

const uploadImg = (fileName, productId) => {
  var formData = {
    my_field: 'my_value',
    my_buffer: Buffer.from([1, 2, 3]),
    file: fs.createReadStream(__dirname + '/img/' + fileName),
  };

  var options = {
    url: 'https://api.ifonepc.vn/v1/product/product/' + productId + '/images',
    headers: {
      'Authorization': 'bearer ' + TOKEN
    },
    formData
  }

  return new Promise((resolve) => {
    request.post(options, function optionalCallback(err, httpResponse, body) {
      if (err) {
        console.error('upload failed:', err);
        resolve()
      }
      console.log("UPLOADED IMG");
      resolve()
    });
  })

}

const asyncGetBrandFunc = async () => {
  var result = await getBrand()
  result.map((item) => {
    var options = {
      uri: 'https://api.ifonepc.vn/v1/product/brand',
      headers: {
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTcxNTA1MDUsImlhdCI6MTU1NzEwNzMwNSwic3ViIjoiNWNjYmY0ODk4NmIyNjEwNDM4ODJkYjFlIn0.LwcOHJB_zrXaAab8BedW7dRDYHkNViTVkCn9l8q_1Ng'
      },
      json: { name: firstLetterUpper(item) }
    }
    request.post(options, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log(body);
    });
  })

}

// asyncGetProductFunc()


const createProduct = (item) => {
  return new Promise(async (resolve) => {
    let imgName = item.img.slice(item.img.lastIndexOf('/') + 1)
    let detail = await getProductDetail(item.link)
    let category = await getApi.getCategory(item.category, TOKEN)
    let brand = await getApi.getBrand(firstLetterUpper(detail.hangSanXuat), TOKEN)
    var data = {
      name: item.name.slice(0,125),
      regular_price: item.price,
      sale_price: item.price,
      categories: [],
      content: detail.gioiThieu,
      stock_quantity: 100
    }
    if (category && category.parent) {
      data.category = category._id,
        data.categories[0] = category.parent
      data.categories[1] = category._id
    }
    if (brand) {
      data.brand = brand._id
    }
    const savedProduct = await getApi.postProduct(data, TOKEN)
    if (savedProduct.data){
      await uploadImg(imgName, savedProduct.data._id)
      console.log("DONE!")
    }
      else console.log('fail')
    resolve()
  })
}

asyncGetProductFunc()

