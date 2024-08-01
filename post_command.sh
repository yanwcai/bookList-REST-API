#!/bin/bash
# Example curl command to add a new book (multiple new books)
# chmod +x post_command.sh
# ./post_command.sh

API_URL="http://localhost:3000/books"

# Array of JSON strings representing books (declare -a -> define an array variable)
declare -a books=(
'{
    "title": "El Gran Gatsby",
    "author": "F. Scott Fitzgerald",
    "year_of_publication": 2001,
    "publisher": "Colleccion Millenium",
    "imageurl_s": "http://images.amazon.com/images/P/8481301132.01.THUMBZZZ.jpg",
    "imageurl_m": "http://images.amazon.com/images/P/8481301132.01.MZZZZZZZ.jpg",
    "imageurl_l": "http://images.amazon.com/images/P/8481301132.01.LZZZZZZZ.jpg",
    "id": "8481301132"
 }'
'{
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "year_of_publication": 1960,
    "publisher": "J.B. Lippincott & Co.",
    "imageurl_s": "http://example.com/mockbird_s.jpg",
    "imageurl_m": "http://example.com/mockbird_m.jpg",
    "imageurl_l": "http://example.com/mockbird_l.jpg",
    "id": "1960112233"
 }'
 '{
    "title": "For Whom the Bell Tolls",
    "author": "Ernest Hemingway",
    "year_of_publication": 1995,
    "publisher": "Scribner",
    "imageurl_s": "http://images.amazon.com/images/P/0684803356.01.THUMBZZZ.jpg",
    "imageurl_m": "http://images.amazon.com/images/P/0684803356.01.MZZZZZZZ.jpg",
    "imageurl_l": "http://images.amazon.com/images/P/0684803356.01.LZZZZZZZ.jpg",
    "id": "0684803356"
 }'
'{
    "title": "East of Eden",
    "author": "John Steinbeck",
    "year_of_publication": 2002,
    "publisher": "Penguin Books",
    "imageurl_s": "http://images.amazon.com/images/P/0142000655.01.THUMBZZZ.jpg",
    "imageurl_m": "http://images.amazon.com/images/P/0142000655.01.MZZZZZZZ.jpg",
    "imageurl_l": "http://images.amazon.com/images/P/0142000655.01.LZZZZZZZ.jpg",
    "id": "0142000655"
 }'
 '{
    "title": "One Hundred Years of Solitude",
    "author": "Gabriel Garcia Marquez",
    "year_of_publication": 2003,
    "publisher": "HarperCollins",
    "imageurl_s": "http://images.amazon.com/images/P/0060531045.01.THUMBZZZ.jpg",
    "imageurl_m": "http://images.amazon.com/images/P/0060531045.01.MZZZZZZZ.jpg",
    "imageurl_l": "http://images.amazon.com/images/P/0060531045.01.LZZZZZZZ.jpg",
    "id": "0060531045"
 }'
)

# Loop through each book and post it to the API
for book in "${books[@]}"
do
  echo "Adding book: $book"
  curl -X POST $API_URL \
       -H "Content-Type: application/json" \
       -d "$book"
  echo -e "\n"
done
