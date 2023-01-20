const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Set up connection to mongoDB
mongoose.connect("mongodb://localhost:27017/bookListDB", {useNewUrlParser: true});

// Create a new schema
const bookSchema = {
    title: String,
    contentBrief: String
};
// Set up book model
const Book = mongoose.model("Book", bookSchema);

app.get("/books", function(req, res) {
    Book.find(function(err, foundBooks) {
        if (!err) {
            res.send(foundBooks);
        } else {
            res.send(err);
        }
    })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});