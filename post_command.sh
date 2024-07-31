#!/bin/bash
# An example curl command to add a new book

curl -X POST http://localhost:3000/books \
     -H "Content-Type: application/json" \
     -d '{
           "title": "El Gran Gatsby",
           "author": "F. Scott Fitzgerald",
           "year_of_publication": 2001,
           "publisher": "Colleccion Millenium",
           "imageurl_s": "http://images.amazon.com/images/P/8481301132.01.THUMBZZZ.jpg",
           "imageurl_m": "http://images.amazon.com/images/P/8481301132.01.MZZZZZZZ.jpg",
           "imageurl_l": "http://images.amazon.com/images/P/8481301132.01.LZZZZZZZ.jpg",
           "id": "8481301132"
         }'