const { JSDOM } = require('jsdom');
module.exports = () => {
  return new Promise((resolve) => {
    JSDOM.fromURL("http://nova.vn/", {}).then(dom => {
      const html = dom.serialize()
      const jsdom = new JSDOM(html);
      let data = []
      const $ = require('jquery')(jsdom.window)
      // $('.sidebar-dropdown').children('li').children('a').each(function () {
      $('.cateparent').each(function () {
        var name = $(this).children('a').text()
        var category = []
        $(this).children('.sidebar-dropdown').children('li').children('a').each(function () {
          category.push($(this).text())
        })
        data.push({ name, category })
      })
      resolve(data)
    });
  })
}
