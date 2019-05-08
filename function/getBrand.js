const { JSDOM } = require('jsdom');
module.exports = () => {
  return new Promise((resolve) => {
    JSDOM.fromURL('http://nova.vn/', {}).then(dom => {
      const html = dom.serialize()
      const jsdom = new JSDOM(html);
      const $ = require('jquery')(jsdom.window)
      var list = []
      $('.sidebar-dropdown').children('li').children('ul').children('li').children('a').each(function () {
        let brand = $(this).text()
        if (list.indexOf(brand) < 0) {
          list.push(brand)
        }
        else return

      })
      resolve(list)
    });
  })
}