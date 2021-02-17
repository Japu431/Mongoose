const Link = require("../models/Link");

const redirect = async (req, res, next) => {
  let title = req.params.title;
  try {
    let doc = await Link.findOne({ title });
    console.log(doc);

    if (doc) {
      res.redirect(doc.url);
    } else {
      next();
    }
  } catch (err) {
    res.send(`Houve um erro ${err}`);
  }
};

const addLink = async (req, res) => {
  let link = new Link(req.body);

  try {
    let doc = await link.save();
    res.redirect("/");
  } catch (err) {
    res.render("index", { err, body: req.body });
  }
};

const allLinks = async (req, res) => {
  try {
    let docs = await Link.find({});
    res.render("all", { links: docs });
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
    await Link.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    res.status(404).send(err);
  }
};

const loadLink = async (req, res) => {
  let id = req.params.id;

  try {
    let doc = await Link.findById(id);
    res.render("edit", { err : false , body: doc });
  } catch (err) {
    res.status(404).send(err);
  }
};

const editLink = async (req, res) => {
  let link = {};
  link.title = req.body.title;
  link.description = req.body.description;
  link.url = req.body.url;

  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }
s
  console.log(id)

  try {
    let doc = await Link.updateOne({ _id: id } , link);
    res.redirect("/");
  } catch (err) {
    res.render("edit", { err, body: req.body });
  }
}

module.exports = { redirect, addLink, allLinks, deleteLink, loadLink , editLink};
