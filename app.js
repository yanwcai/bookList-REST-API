const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const db = require('./db');
const app = express();
const open = require('open');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
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


// Request targeting a specific book
app.route("/books/:id")
    .get(async (req, res) => {
        const bookId = req.params.id; 
        try {
            const query = 'SELECT * FROM books WHERE id = $1'; 
            const result = await db.query(query, [bookId]); 
            if (result.rows.length > 0) {
                res.json(result.rows); // if the book is found
            } else {
                res.status(404).send("No book was found."); 
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error'); 
        }
    })
    .put(async (req, res) => {
        const { title, author, year_of_publication, publisher, imageurl_s, imageurl_m, imageurl_l, id } = req.body;
        console.log("req.body: " + req.body + '\n')

        const query = `
            UPDATE books
            SET title = $1, author = $2, year_of_publication = $3, publisher = $4, imageurl_s = $5, imageurl_m = $6, imageurl_l = $7
            WHERE id = $8;
        `;
        const values = [title, author, year_of_publication, publisher, imageurl_s, imageurl_m, imageurl_l, id];

        try {
            const result = await db.query(query, values);
            if (result.rowCount > 0) {
                res.send("Book updated successfully.");
            } else {
                res.status(404).send("Book not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });

    /*
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
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });