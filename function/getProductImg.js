const { JSDOM } = require('jsdom');
module.exports = (url) => {
  return new Promise((resolve) => {
    JSDOM.fromURL(url, {}).then(dom => {
      let result = []
      const html = dom.serialize()
      const jsdom = new JSDOM(html);


      const $ = require('jquery')(jsdom.window)

      $('.product-tmh-hover').each(async function (index) {
        let img = $(this).children('div').children('a').children('img').attr('src')
        result.push(img)
        // console.log(url,{ img, category, name, price: parseInt(price) })
      })
      resolve(result)
    });
  })
}