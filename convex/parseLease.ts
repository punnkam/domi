const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('../assets/lease.pdf');

pdf(dataBuffer).then((data: any) => {
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata);
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log(data.text);
});
