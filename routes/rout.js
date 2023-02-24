const { response } = require("express");
const express = require("express");
const { ObjectId } = require("mongodb");
const db = require("../config/connection");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    const data = new Promise((resolve, reject) => {
      db.getDb()
        .collection("details")
        .find()
        .toArray()
        .then((response) => {
          // console.log("find response working",response);
          resolve(response);
        });
    });
    data.then((data) => {
      console.log(data);
      res.render("tables.ejs", { data });
    });
  } catch (err) {
    res.render("errorpage.ejs",{err});
  }
});

router.get("/add-new-student", (req, res) => {
  res.render("forms.ejs");
});

router.post("/addStudent", (req, res) => {
  console.log(req.body, "workingg");
  try {
    const data = new Promise((resolve, reject) => {
      db.getDb()
        .collection("details")
        .insertOne(req.body)
        .then((response) => {
          console.log("data work");
          resolve("New student added successfully");
        });
    });
    data.then((response) => {
      console.log(response, "response");
      res.redirect("/");
    });
  } catch {
    res.render("errorpage.ejs",{err});
  }
});

router.get("/deleteStudent/:id", (req, res) => {
  console.log("Workind delete", req.params.id);
  try {
    const data = new Promise((resolve, reject) => {
      db.getDb()
        .collection("details")
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then((response) => {
          console.log(response);
          resolve("deleted");
        });
    });
    data.then((response) => {
      res.redirect("back");
    });
  } catch (err) {
    res.render("errorpage.ejs",{err});
  }
});

router.post("/update/:id", (req, res) => {
  console.log("update working", req.body);
  console.log("update workingdddd", req.params.id);
  try {
    db.getDb()
      .collection("details")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
      .then((response) => {
        res.redirect("/");
      });
  } catch (err) {
    console.log(err);
    res.render("errorpage.ejs",{err});
  }
});

router.get("/update/:id", (req, res) => {
  console.log("update work", req.params.id);
  try {
    db.getDb()
      .collection("details")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((response) => {
        console.log(response);
        res.render("updateForm.ejs", { response });
      });
  } catch (err) {
    res.render("errorpage.ejs",{err});
  }
});

module.exports = router;
