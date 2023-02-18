const fs = require('fs');
const pdf = require('pdf-parse');

async function parseLease() {
    let dataBuffer = fs.readFileSync(
        '/Users/punnkam/desktop/domi/convex/lease.pdf'
    );

    // const { Configuration, OpenAIApi } = require('openai');
    // const configuration = new Configuration({
    //     apiKey: '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',
    // });
    // const openai = new OpenAIApi(configuration);
    // const response = await openai.createCompletion({
    //     model: 'text-davinci-003',
    //     prompt: 'Say this is a test',
    //     temperature: 0,
    //     max_tokens: 7,
    // });
    // console.log(response.data.choices[0].text);

    pdf(dataBuffer).then((data: any) => {
        // // number of pages
        // console.log(data.numpages);
        // // number of rendered pages
        // console.log(data.numrender);
        // // PDF info
        // console.log(data.info);
        // // PDF metadata
        // console.log(data.metadata);
        // // PDF.js version
        // // check https://mozilla.github.io/pdf.js/getting_started/
        // console.log(data.version);
        // PDF text
        const rentIndex: number = data.text.search('Occupants');
        console.log(data.text.slice(rentIndex, rentIndex + 1000));
        // console.log(data.text.length);
    });
}

parseLease();
