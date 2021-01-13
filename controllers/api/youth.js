const Youth = require('../../models/Youth');

exports.list = async (req, res) => {
    const searchQuerry = req.query.search;
    console.log("api list");
    console.log(searchQuerry);

    if(!searchQuerry){
        res.json([]);
    }

    try{
        const result = await Youth.find(
            { $text: { $search: searchQuerry }},
            { textScore: { $meta: "textScore" } }
        )
        res.json(result);
    } catch (ex) {
        res.status(404).send({message: 'could not do it'});
        console.log(ex);
    }
}