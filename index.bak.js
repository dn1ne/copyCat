const testHTML = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <input type="text" id="fiptest">
  <p>lalala</p>
</body>
</html>
`;

const { JSDOM } = require('jsdom');
// const jsdom = new JSDOM( testHTML );


// Set window and document from jsdom
// const { window } = jsdom;
// const { document } = window;
// Also set global window and document before requiring jQuery
// global.window = window;
// global.document = document;



const $ = global.jQuery = require('jquery');

// console.log(`jQuery ${jQuery.fn.jquery} working! Yay!!!`);
// console.log($('p').text());

JSDOM.fromURL("https://example.com/", {}).then(dom => {
  const html = dom.serialize()
  const jsdom = new JSDOM(html);


  // Set window and document from jsdom
  const { window } = jsdom;
  const { document } = window;
  // Also set global window and document before requiring jQuery
  global.window = window;
  global.document = document;

  // console.log(`jQuery ${jQuery.fn.jquery} working! Yay!!!`);

  // console.log($('p').text());
  console.log(jsdom.window.document.querySelector("h1").textContent);
});
