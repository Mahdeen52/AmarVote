# AmarVote

A backend API system built with Node.js and Express to manage candidates and votes in a voting application. This project provides RESTful endpoints for adding candidates and retrieving voting data stored in MongoDB.

## Project Overview

This is a backend service designed to handle the core functionality of a voting system. The application allows users to create candidates with party affiliations and track vote counts. The system uses MongoDB as its database to persist candidate and vote information with proper schema validation and timestamps.

## Technology Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for building the API
- **MongoDB** - NoSQL database for storing candidate and vote data
- **Mongoose** - Object Data Modeling library for MongoDB
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing middleware
- **Nodemon** - Development tool for automatic server restart

## Project Structure

The application follows a standard MVC architecture pattern with clear separation of concerns:

```
backend/
├── controller/
│   └── candidateController.js    # Business logic for candidate operations
├── db/
│   └── db.js                      # Database connection configuration
├── model/
│   ├── candidates.model.js        # Candidate schema definition
│   └── vote.model.js              # Vote schema definition
├── router/
│   └── candidates.routes.js       # API route definitions
├── .env                           # Environment variables (not tracked)
├── .gitignore                     # Git ignore rules
├── constants.js                   # Application constants
├── package.json                   # Project dependencies
├── request.http                   # API testing file
└── server.js                      # Application entry point
```

## Database Schema

### Candidate Model

Each candidate document contains the following fields:

- **name** (String, required) - The name of the candidate
- **party** (String, required) - The political party affiliation
- **votes** (Number, default: 0) - Total number of votes received
- **timestamps** - Automatically tracks creation and update times

### Vote Model

Each vote document contains:

- **candidateId** (ObjectId, required) - Reference to the Candidate collection
- **voterId** (String, required) - Unique identifier for the voter
- **timestamps** - Automatically tracks when the vote was cast

## API Endpoints

The application currently supports the following endpoints:

### Get All Candidates
- **Method:** GET
- **Endpoint:** `/api/candidates`
- **Description:** Retrieves a list of all candidates in the database
- **Response:** JSON array of candidate objects

### Add New Candidate
- **Method:** POST
- **Endpoint:** `/api/candidates`
- **Description:** Creates a new candidate entry
- **Request Body:**
  ```json
  {
    "name": "Candidate Name",
    "party": "Party Name"
  }
  ```
- **Response:** JSON object of the newly created candidate

## Installation and Setup

### Prerequisites

Before running this project you need to have the following installed:

- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm (comes with Node.js)

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
MONGO_URL=your_mongodb_connection_string
PORT=5000
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection URL.

### Installation Steps

1. Clone the repository to your local machine
2. Navigate to the backend directory
3. Install all dependencies:
   ```
   npm install
   ```
4. Configure your environment variables in the `.env` file
5. Start the development server:
   ```
   npm start
   ```

The server will start on the port specified in your environment variables (default is 5000).

## Current Development Status

### Completed Features

- MongoDB database connection with error handling
- Candidate model with vote tracking capability
- Vote model with candidate reference
- RESTful API endpoints for candidate management
- CORS enabled for cross-origin requests
- Environment variable configuration
- Git version control setup

### Known Issues

There is a minor typo in the vote model schema where `requiredL` should be corrected to `required`.

## Future Development

Potential features and improvements that could be added:

- Vote casting endpoint implementation
- User authentication and authorization
- Voter registration system
- Vote validation to prevent duplicate voting
- Real-time vote count updates
- Candidate profile images
- Results visualization endpoints
- Admin dashboard for managing candidates
- Vote deletion or audit trail functionality
- Input validation and error handling improvements

## Testing

The project includes a `request.http` file for testing API endpoints. You can use REST client extensions in your code editor to test the endpoints directly from this file.

## Version Control

The project uses Git for version control. Sensitive files such as environment variables and node modules are excluded via `.gitignore` to maintain security and repository cleanliness.

## License

ISC

## Author

This project was developed as a mini project to demonstrate backend development skills with Node.js and MongoDB.
