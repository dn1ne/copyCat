const { JSDOM } = require('jsdom');
module.exports = (url) => {
  return new Promise((resolve) => {
    JSDOM.fromURL(url, {}).then(dom => {
      let result = []
      const html = dom.serialize()
      const jsdom = new JSDOM(html);


      const $ = require('jquery')(jsdom.window)

      $('.product-tmh-hover').each(async function (index) {
        let link = $(this).children('div').children('a').attr('href')
        let img = $(this).children('div').children('a').children('img').attr('src')
        let category = $(this).children('.product-info').children('.cate1').children('a').text()
        let name = $(this).children('.product-info').children('h5').children('a').text()
        let price = ($(this).children('.product-info').children('.price1').text().replace(/\,|đ/g, ''))
        if (!price) {
          price = ($(this).children('.product-info').children('.price_km').text().replace(/\,|đ/g, ''))
        }
        else if (price === 'call') {
          price = 0
        }
        result.push({ img, category, name, price: parseInt(price), link })
        // console.log(url,{ img, category, name, price: parseInt(price) })
      })
      resolve(result)
    });
  })
}