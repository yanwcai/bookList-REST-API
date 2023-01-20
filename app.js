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


// Chained route handlers
app.route("/books")
    // Fetch all the books
    .get(function(req, res) {
        Book.find(function(err, foundBooks) {
            if (!err) {
                res.send(foundBooks);
            } else {
                res.send(err);
            }
        });
    })
    // Add a new document to the database
    .post(function(req, res) {
        const newBook = new Book({
            title: req.body.title,
            contentBrief: req.body.contentBrief
        })
        newBook.save(function(err) {
            if (!err) {
                res.send("Successfully added a new book.");
            } else {
                res.send(err);
            }
        });
    })

    .delete(function(req, res){
        Book.deleteMany(function(err) {
            if (!err) {
                res.send("Successfully deleted all books.");
            } else {
                res.send(err);
            }
        });
    });


// Request targeting a specific book
// using express parameters
app.route("/books/:bookTitle")
    .get(function(req, res) {
        Book.findOne({title: req.params.bookTitle}, function(err, foundBook) {
            if (foundBook) {
                res.send(foundBook);
            } else {
                res.send("No book with this title was found.");
            }
        });
    })
    .put(function(req, res) {
        Book.updateOne(
            {title: req.params.bookTitle},
            {title: req.body.title, contentBrief: req.body.contentBrief},
            // {overwrite: true},
            function(err) {
                if (!err) {
                    res.send("Successfully updated book info.");
                } else {
                    res.send(err);
                }
            }
        );
    })
    .patch(function(req, res) {
        Book.updateOne(
            {title: req.params.bookTitle},
            {$set: req.body},
            function(err) {
                if (!err) {
                    res.send("Successfully updated book info.");
                } else {
                    res.send(err);
                }
            }
        );
    })
    .delete(function(req, res) {
        Book.deleteOne(
            {title: req.params.bookTitle},
            function(err) {
                if (!err) {
                    res.send("Successfully deleted this book.");
                } else {
                    res.send(err);
                }
            }
        )
    })

app.listen(3000, function() {
  console.log("Server started on port 3000");
});