const Link = require("../models/Link");

const redirect = async (req, res) => {
  let title = req.params.title;
  try {
    let docs = await Link.find({ title });
    console.log(docs);
    res.redirect(docs[0].url);
  } catch (err) {
    res.send(`Houve um erro ${err}`);
  }
};

const addLink = async (req, res) => {
  let link = new Link(req.body);

  link
    .save()
    .then((doc) => {
      res.send("Link adicionado com sucesso... >>>> " + doc);
    })
    .catch((err) => {
      console.log(err);
      res.render("index", { err, body: req.body });
    });
};

module.exports = { redirect, addLink };
