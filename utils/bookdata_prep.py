# Reference: chatGPT
import csv

# Define the input and output file paths
input_file_path = 'books_data/books.csv'
output_file_path = 'booklist_s.csv'

# Open the input CSV file and create a CSV reader object
with open(input_file_path, mode='r', newline='') as infile:
    reader = csv.reader(infile)
    
    # Open the output CSV file and create a CSV writer object
    with open(output_file_path, mode='w', newline='') as outfile:
        writer = csv.writer(outfile)
        
        # Write the first 10 rows to the output file
        for i, row in enumerate(reader):
            if i < 10:
                writer.writerow(row)
            else:
                break

print(f"First 10 rows have been written to {output_file_path}")
