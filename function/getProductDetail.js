const { JSDOM } = require('jsdom');
module.exports = (url) => {
  return new Promise((resolve) => {
    JSDOM.fromURL(url, {}).then(dom => {
      const html = dom.serialize()
      const jsdom = new JSDOM(html);

      const $ = require('jquery')(jsdom.window)
      let hangSanXuat = $('.product-single-info > table > tbody > tr:first-child > td:nth-child(2) > b').text()
      let gioiThieu = $('.page-content.tab-content > #tab1').html()
      // let gioiThieu = $('.page-content.tab-content > #tab1 > .row').html()
      let thongSo = $('.page-content.tab-content > #tab2').html()
      resolve({ hangSanXuat, gioiThieu: gioiThieu.replace('\n\t\t\t\t\t\t<div class="row">\n', ''), thongSo })
    });
  })
}