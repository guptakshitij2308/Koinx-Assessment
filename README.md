Trade Management and Balance Calculation App
This repository contains an Express.js application designed to manage cryptocurrency trade data and calculate balances based on uploaded CSV files. The application supports the upload of trade data, processes it, and stores it in MongoDB. Users can also calculate the balance of trades up to a specified timestamp using the provided API.

Features
CSV Trade Data Upload: Easily upload trade data in CSV format. The application parses and stores the trade records in a MongoDB database.
Balance Calculation: Calculate the balance of various cryptocurrencies based on historical trade data up to a specific point in time.
MongoDB Integration: All trade records and balances are stored and managed using MongoDB, ensuring efficient data handling.
Express.js API: The app exposes RESTful API endpoints for uploading CSV files and calculating balances.
Prerequisites
Before you begin, ensure you have the following installed on your local machine:

Node.js (v14.x or higher)
MongoDB (running locally or available via a cloud service like MongoDB Atlas)
Installation
1. Clone the Repository
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/trade-management-app.git
2. Navigate to the Project Directory
bash
Copy code
cd trade-management-app
3. Install Dependencies
Install the required dependencies using npm:

bash
Copy code
npm install
4. Set Up Environment Variables
Create a .env file in the root directory and add the following environment variables:

env
Copy code
DB=your_mongodb_uri
PORT=8000
Replace your_mongodb_uri with your actual MongoDB connection string.
You can change the PORT if you want to run the application on a different port.
5. Start the Application
Start the Express.js server:

bash
Copy code
npm start
The application will run on http://localhost:8000.

Usage
API Endpoints
1. Upload CSV: POST /api/v1/trades/upload_csv
Description: Upload a CSV file containing trade data. The file is parsed, and each trade is stored in MongoDB.
Request:
Content-Type: multipart/form-data
Body:
file (required): The CSV file to be uploaded.
Response:
200 OK: If the CSV file is processed successfully.
400 Bad Request: If no file is uploaded or if there is an issue with the file format.
500 Internal Server Error: If there is a problem processing the file.
2. Calculate Balance: POST /api/v1/balance
Description: Calculate the balance of trades up to a specified timestamp.
Request:
Content-Type: application/json
Body:
timestamp (required): A valid ISO 8601 timestamp (e.g., 2024-08-10T12:00:00Z).
Response:
200 OK: Returns a JSON object containing the balance of each cryptocurrency.
400 Bad Request: If the timestamp is missing or invalid.
500 Internal Server Error: If there is an error calculating the balance.
Example Request and Response
Upload CSV
Request:

bash
Copy code
curl -X POST http://localhost:8000/api/v1/trades/upload_csv \
  -F "file=@path/to/your/trades.csv"
Response:

json
Copy code
{
  "message": "CSV file processed successfully"
}
Calculate Balance
Request:

bash
Copy code
curl -X POST http://localhost:8000/api/v1/balance \
  -H "Content-Type: application/json" \
  -d '{"timestamp": "2024-08-10T12:00:00Z"}'
Response:

json
Copy code
{
  "BTC": 2.5,
  "ETH": -1.3
}
Directory Structure
plaintext
Copy code
├── controller
│   ├── balanceController.js  # Handles balance calculation logic
│   └── tradesController.js   # Handles trade data processing and CSV upload
├── models
│   └── TradeRecord.js        # Mongoose schema for storing trade records
├── routes
│   ├── balanceRouter.js      # API routes for balance calculation
│   └── tradesRouter.js       # API routes for CSV upload
├── uploads                   # Directory where uploaded CSV files are temporarily stored
├── .env                      # Environment variables file
├── app.js                    # Main entry point of the application
└── package.json              # Project dependencies and scripts
Error Handling
The application includes basic error handling for common issues like missing files, invalid timestamps, and database connection errors.
Logs are generated for errors during trade data parsing and balance calculations.
Future Improvements
User Authentication: Implement user authentication to secure API endpoints.
Data Validation: Enhance validation for CSV data to handle edge cases and malformed inputs.
Pagination: Add pagination for large datasets when fetching trade records.
Contributing
Contributions are welcome! Please fork this repository and submit a pull request with your proposed changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.
