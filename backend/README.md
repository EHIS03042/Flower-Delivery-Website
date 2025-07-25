# Flower-Delivery-Website

# Project Overview
Flower Delivery Website Backend - Milestone 1
This repository contains the backend for the Flower Delivery Website, developed as part of Milestone 1. It provides a RESTful API for managing flower products, including creating, reading, updating, and deleting flower entries, with support for image uploads.

# Table of Contents
●	Features
●	Technologies Used
●	File Structure
●	Getting Started
○	Prerequisites
○	Installation
○	Environment Variables
○	Running the Server
●	API Endpoints
○	Flowers
●	Error Handling
●	Presentation Link(Loom Video)
●	Live Demo(on Render.com)
●	Author Details
●	Contributions
●	License

## Features
●	CRUD Operations for Flowers:
○	Create new flower entries with details like name, description, price, category, and an image.
○	Retrieve a list of all flowers.
○	Retrieve a single flower by its ID.
○	Update existing flower details, including replacing the image.
○	Delete flower entries.
●	Image Uploads: Supports uploading flower images to the server.
●	MongoDB Integration: Uses Mongoose for interacting with a MongoDB Atlas database.
●	RESTful API: Follows REST principles for clear and consistent API design.
●	CORS Enabled: Allows cross-origin requests for frontend integration.

## Technologies Used
●	Node.js: JavaScript runtime environment.
●	mongoDB: a NoSQL database designed for scalability, flexibility; stores data in a JSON-like format
●	POSTMAN: a collaboration platform for API development,widely used to test, automate, and document APIs.
●	Express.js: Web application framework for Node.js.
●	Mongoose: MongoDB object data modeling (ODM) for Node.js.
●	Multer: Middleware for handling multipart/form-data, primarily used for uploading files.
●	CORS: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
●	Dotenv: Loads environment variables from a .env file.

## File Structure
.
├── .env                  # Environment variables
├── server.js             # Main server file
├── models/
│   └── flowerModel.js    # Mongoose schema for Flower
├── routes/
│   └── flowerRoutes.js   # API routes for flowers
├── controller/
│   └── flowerController.js # Logic for handling flower-related requests
├── middleware/
│   └── upload.js         # Multer configuration for image uploads
└── uploads/              # Directory for uploaded images (created automatically)
├── .gitignore/
│   └─.env + node_modules # To ensure a seamless git push to the repository.
├── package-lock.json     # Locks the exact version of installed packages with their dependencies. 
└── package.json          # The main configuration file,listing the project dependencies.
├── README.md             # Full outline of Project details.
├── LICENSE               # Licensing information.

## Getting Started
Follow these instructions to set up and run the backend server on your local machine.
### Prerequisites
●	Node.js (LTS version recommended)
●	MongoDB Atlas account (or a local MongoDB instance)
●	npm (Node Package Manager)
Installation
1.	Clone the repository:
git clone <repository_url>
cd flower-delivery-backend

2.	Install dependencies:
npm install

### Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:
MONGODB_URI=your_mongodb_connection_string
PORT=3001

●	MONGODB_URI: Your MongoDB Atlas connection string. Make sure to replace <username>, <password>, and <cluster_name> with your actual credentials.
●	PORT: The port on which the server will run (e.g., 3001).
Case-in-point: .env file content (from your provided file):
MONGODB_URI=mongodb+srv://tolulopemcsmith:EBRh7YQGAHJQqqGt@backend.nxaplmr.mongodb.net/
PORT=3001

### Running the Server.
To start the server, run the following command:
npm start

The server will typically run on http://localhost:3001 (or the port you specified in your .env file). You should see a message in your console indicating that the server is running and connected to MongoDB.


## API Endpoints.
All API endpoints are prefixed with /api.
Flowers
Method	Endpoint	Description	Request Body (JSON)	Response
GET	/api/flowers	Get all flowers	None	Array of flower objects
GET	/api/flowers/:id	Get a single flower by ID	None	Object representing the flower
POST	/api/flowers	Create a new flower (with image upload)	multipart/form-data with fields: name, description, price, category, and image (file)	Object of the newly created flower
PATCH	/api/flowers/:id	Update an existing flower by ID (with optional image update)	multipart/form-data with fields to update (e.g., name, price, image (file))	Object of the updated flower
DELETE	/api/flowers/:id	Delete a flower by ID	None	{ message: 'Flower deleted' }
Example POST or PATCH Request (using curl for multipart/form-data):
curl -X POST -F "name=Red Rose" -F "description=A beautiful red rose" -F "price=15.99" -F "category=Romantic" -F "image=@/path/to/your/image.jpg" http://localhost:3001/api/flowers

## Error Handling.
The API provides basic error handling:
●	500 Internal Server Error: For general server-side errors.
●	404 Not Found: If a requested resource (e.g., flower by ID) is not found.
●	400 Bad Request: (Implicitly handled by Mongoose validators for required fields).
●	Image Upload Errors: If a non-image file is uploaded, an error message "Error: Images Only!" will be returned.

## Presentation Link(Loom Video)
[[Presentation Link](https://www.loom.com/share/01d3878d146f48498fc133eb910dd095?sid=70aa91f3-b4e5-452a-b78b-46056c6b2a0b)]

## Live Demo(on Render.com)
[[live_demo](https://flower-delivery-website-af2b.onrender.com)]

## Author Details
Name: [Tolulope McSmith - EHIS03042]
Contact: [tolulope.mcsmith@gmail.com]
 [[Github Profile](https://github.com/EHIS03042)]

## Intellectual/Technical Contributions
Contributions are welcome! Please feel free to add your comments, inputs and express interest to collaborate on the rest of the project.

## License
This project is published under the MIT License.This license grants users the rights to use, copy, modify, merge, publish, distribute and sublicense the licensed IP.It however requires that the original copyright notice and license text must be included in all copies or substantial portions of the project in accordance with the terms and conditions stipulated in the license.
