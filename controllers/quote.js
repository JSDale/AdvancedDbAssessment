
exports.quote = async (req, res) => {
    console.info(req.session);
    const Quote = require('../models/Quote');
    const allQuote = await Quote.find({}).select('Quote');
    console.info(allQuote);
    test =  "hello world";
    res.render("index", {test: test});
}

function getNewQuoteDaily()
{
    var y = 5; 
    var x = 3;
    var data = new Date(2020,1,7)       
    var updatedData = Date.now();
    var difference = updatedData - data;
    var milliSeconds = 24 * 60 * 60 * 1000;
    if (difference >= milliSeconds){
        //array[] = {"hello", "hello"};
        const randomElement = array[Math.floor(Math.random() * array.length)];
        var z = parseInt(y) + x;
        console.log(z);
        data = updatedData;
    }
}