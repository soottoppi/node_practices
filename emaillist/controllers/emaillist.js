const model = require(`../models/emaillist`);

module.exports = {
    index: async function (req, res) {
        const result = await model.findAll();
        console.log(result);
        res.render("index", {
            list: result || [],
        });
    },

    form: function (req, res) {
        res.render("form");
    },

    add: async function (req, res) {
        console.log(req.body);
        const results = await model.insert(req.body);
        res.redirect("/");
    },
};
