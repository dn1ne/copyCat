const { JSDOM } = require('jsdom');
module.exports = (url) => {
  return new Promise((resolve) => {
    JSDOM.fromURL(url, {}).then(dom => {
      let linkList = []
      const html = dom.serialize()
      const jsdom = new JSDOM(html);


      const $ = require('jquery')(jsdom.window)

      $('.product-tmh-hover').each(async function (index) {
        let link = $(this).children('div').children('a').attr('href')
        linkList.push(link)
      })
      resolve(linkList)
    });
  })
}