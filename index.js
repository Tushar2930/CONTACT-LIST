const express = require('express');

const path = require("path");
const port = 8000;

const db = require('./config/mongoose');
const Contact = require("./models/contact");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

// app.use(function (req, res, next) {
//     req.myname = "Tushar";
//     console.log("1");
//     next();
// });

// app.use(function (req, res, next) {
//     console.log("2");
//     console.log(req.myname);
//     next();
// });

var contactList = [
    {
        name: "Tushar",
        phone: "9022176049"
    },
    {
        name: "Gajanan",
        phone: "7350524212"
    },
    {
        name: "Aruna",
        phone: "8767840589"
    }
];

app.get('/', function (req, res) {


    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home', {
            title: "Contact List",
            contact_list: contacts
        });

    })

})

app.get("/delete-contact", function (req, res) {
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("ERROR");
        }
        return res.redirect("/");

    });

});

app.get("/plays", function (req, res) {
    return res.render("play");
});

app.post("/create-contact", function (req, res) {
    // return res.redirect("/plays");
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // }
    // );
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log("error");
            return;
        }
        console.log("****", newContact);
        return res.redirect("/");
    });

});

app.listen(port, function (err) {

    if (err) {
        console.log(err);
        return;
    }
    console.log("server is running on port :", port);

});