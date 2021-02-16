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
      res.send("Link adicionado com sucesso. :)");
    })
    .catch((err) => {
      console.log(err);
      res.render("index", { err, body: req.body });
    });
};

const allLinks = async (req, res) => {
  try {
    let links = await Link.find({});
    res.render("all", { links });
  } catch (err) {
    res.send(err);
  }
};

const deleteLink = async (req, res) => {
  let id = req.params.id;

  if (!id) {
    id = req.body.id;
  }

  try {
    res.send(await Link.findByIdAndDelete(id));
  } catch (err) {
    req.send(err)
  }
};

module.exports = { redirect, addLink, allLinks, deleteLink };
