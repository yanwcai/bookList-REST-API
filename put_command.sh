#!/bin/bash
# Example curl command to update a book
# chmod +x put_command.sh
# ./put_command.sh

echo "Updating a book: $BOOK_ID"

curl -X PUT "http://localhost:3000/books/" -H "Content-Type: application/json" -d '{
  "title": "New Title",
  "author": "F. Scott Fitzgerald",
  "year_of_publication": 2001,
  "publisher": "New Publisher",
  "imageurl_s": "http://images.amazon.com/images/P/8481301132.01.THUMBZZZ.jpg",
  "imageurl_m": "http://images.amazon.com/images/P/8481301132.01.MZZZZZZZ.jpg",
  "imageurl_l": "http://images.amazon.com/images/P/8481301132.01.LZZZZZZZ.jpg",
  "id": "8481301132"
}'
