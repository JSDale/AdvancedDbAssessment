exports.quote = async (req, res) => {
    console.info(req.session);
    const Quote = require('../models/Quote');
    allQuote = await Quote.find({}, '-_id').select('Quote');
    //console.info(allQuote);
    var randomElement = allQuote[Math.floor(Math.random() * allQuote.length)];
    randomElement = randomElement.toString().replace("{", "");
    randomElement = randomElement.toString().replace("}", "");
    quote =  randomElement;
    res.render("index", {quote: quote});
}