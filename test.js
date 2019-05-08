const getProduct = async () => {
  return new Promise((resolve) => {
    var result = []
    JSDOM.fromURL(url, {}).then(dom => {

      const html = dom.serialize()
      const jsdom = new JSDOM(html);

      // Set window and document from jsdom
      const { window } = jsdom;
      const { document } = window;
      // Also set global window and document before requiring jQuery
      global.window = window;
      global.document = document;

      const $ = global.jQuery = require('jquery');

      $('.product-tmh-hover').each(function (index) {
        const img = $(this).children('div').children('a').children('img').attr('src')
        const category = $(this).children('.product-info').children('.cate1').children('a').text()
        const name = $(this).children('.product-info').children('h5').children('a').text()
        var price = ($(this).children('.product-info').children('.price1').text().replace(/\,|đ/g, ''))
        if (!price) {
          price = ($(this).children('.product-info').children('.price_km').text().replace(/\,|đ/g, ''))
        }
        result.push({ img, category, name, price: parseInt(price) })
      })
      resolve(result)
    });
  })
}

