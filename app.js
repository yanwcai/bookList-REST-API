const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const db = require('./db');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(express.json()); 


// Chained route handlers
app.route("/books")
    // Fetch all the books
    .get(async (req, res) => {
        try {
          const result = await db.query('SELECT * FROM books');
          res.json(result.rows);
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      })
    
    // Add a new document to the database
    .post(async (req, res) => {
        const { title, author, year_of_publication, publisher, imageurl_s, imageurl_m, imageurl_l, id } = req.body;
        const query = `
            INSERT INTO books (title, author, year_of_publication, publisher, imageurl_s, imageurl_m, imageurl_l, id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [title, author, year_of_publication, publisher, imageurl_s, imageurl_m, imageurl_l, id];

        try {
            const result = await db.query(query, values);
            res.json(result.rows[0]); // Send the inserted row as response
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
    
    .delete(async (req, res) => {
        try {
            await db.query('DELETE FROM books');
            res.send('All records deleted successfully.\n');
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});


/*
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
*/