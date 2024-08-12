This repository houses an Express.js application that facilitates trade data management and balance calculation. Users can upload trade data via CSV files, and the app processes and stores the trades in MongoDB. The application also provides an API endpoint to calculate balances based on a given timestamp. Built with MongoDB, Multer, and Express.js.

README.md
markdown
Copy code
# Trade Management and Balance Calculation App

This application is built with Express.js and MongoDB to manage trade data and calculate balances based on uploaded CSV files. Users can upload trade data, which is processed and stored in the database. The app also provides an API to calculate the balance of trades up to a specified timestamp.

## Features

- **Trade Data Upload**: Upload trade data via CSV files.
- **Balance Calculation**: Calculate trade balances based on a provided timestamp.
- **MongoDB Integration**: All trade data is stored in MongoDB.
- **API Endpoints**: 
  - `/api/v1/trades/upload_csv`: Upload a CSV file containing trade data.
  - `/api/v1/balance`: Calculate trade balance based on a timestamp.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/trade-management-app.git
Navigate to the project directory:
bash
Copy code
cd trade-management-app
Install the dependencies:
bash
Copy code
npm install
Create a .env file in the root directory and add your MongoDB URI and port:
env
Copy code
DB=your_mongodb_uri
PORT=8000
Usage
Start the server:
bash
Copy code
npm start
The application will run on http://localhost:8000.
API Endpoints
Upload CSV: POST /api/v1/trades/upload_csv
Upload a CSV file containing trade data. The file will be processed and the trades will be stored in the database.
Calculate Balance: POST /api/v1/balance
Calculate the balance of trades up to a specified timestamp. The request body should include a timestamp field.

## License
This project is licensed under the MIT License.
