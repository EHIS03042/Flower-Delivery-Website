# Flower-Delivery-Website

## Project Overview
Flower Delivery Website Backend - **Milestones 1 & 2**

This repository contains the backend for the Flower Delivery Website. The project is built incrementally in milestones. **Milestone 1** focused on the Flower product CRUD functionality. **Milestone 2** introduces user authentication and authorization features including password-based login and Google OAuth, as well as protected routes and JWT token management.

---

## Table of Contents
- Features
- Technologies Used
- File Structure
- Getting Started  
  - Prerequisites  
  - Installation  
  - Environment Variables  
  - Running the Server  
- API Endpoints  
  - Flowers  
  - 🔹Users (Signup/Login)  
- Error Handling  
- Presentation Link (Loom Video)  
- Live Demo (on Render.com)  
- Author Details  
- Contributions  
- License  

---

## Features

### Milestone 1:
- CRUD Operations for Flowers:
  - Create, read, update, delete flower entries.
  - Image upload support via Multer.
- MongoDB integration via Mongoose.
- RESTful API design.
- CORS support for frontend integration.

### 🔹Milestone 2:
- User Authentication System:
  - Signup with name, email, and password.
  - Login using credentials.
  - Password hashing using bcrypt.
  - Email validation and strong password enforcement.
- JWT-based Authentication:
  - Issues JSON Web Tokens upon successful login/signup.
  - Protects API routes using middleware.
- Google OAuth Integration:
  - Allows sign-in with Google accounts (via `googleId`).
- User Schema Enhancements:
  - Stores `name`, `email`, `password`, `googleId`, and `cartData`.

---

## Technologies Used
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- Multer
- bcrypt  
- validator  
- dotenv  
- CORS
- 🔹**jsonwebtoken**: For secure JWT creation and verification.  
- 🔹**Google OAuth** (via client integration – backend-ready for tokens)

---

## File Structure
.
├── .env # Environment variables
├── server.js # Main server file
├── models/
│ ├── flowerModel.js # Mongoose schema for Flower
│ └── userModel.js # 🔹Mongoose schema for User
├── routes/
│ ├── flowerRoutes.js # API routes for flowers
│ └── userRoutes.js # 🔹API routes for user auth
├── controller/
│ ├── flowerController.js # Flower controller logic
│ └── userController.js # 🔹User signup/login logic
├── middleware/
│ ├── upload.js # Multer image upload config
│ └── requireAuth.js # 🔹JWT Auth middleware
├── uploads/ # Image storage directory
├── .gitignore # Ignores node_modules, .env etc.
├── package.json
├── package-lock.json
├── README.md
└── LICENSE
yaml
CopyEdit


## Getting Started

### Prerequisites
- Node.js (LTS)
- npm
- MongoDB Atlas account

### Installation
```bash
git clone <repository_url>
cd flower-delivery-backend
npm install
Environment Variables
Create a .env file in the root directory:
env
CopyEdit
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
PORT=3001
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
•	MONGODB_URI: Connection string from MongoDB Atlas
•	PORT: Port to run the backend on
•	JWT_SECRET: Secret key for signing JWTs
•	GOOGLE_CLIENT_ID: Client ID for verifying Google logins (if implemented client-side)
Running the Server
bash
CopyEdit
npm start
________________________________________
API Endpoints
All endpoints are prefixed with /api.
Flowers
Method	Endpoint	Description
GET	/api/flowers	Get all flowers
GET	/api/flowers/:id	Get flower by ID
POST	/api/flowers	Create new flower (with image upload)
PATCH	/api/flowers/:id	Update flower (optional image)
DELETE	/api/flowers/:id	Delete flower
________________________________________
Users (Milestone 2)
Method	Endpoint	Description
POST	/api/user/signup	Create new user
POST	/api/user/login	Login user and receive JWT
GET	/api/protected	 Sample protected route (requires JWT)
Signup Body
json
CopyEdit
{
  "name": "Delight McSmith",
  "email": "delight@elevateHER.com",
  "password": "SecurePassword123%"
}
Login Body
json
CopyEdit
{
  "email": "delight@example.com",
  "password": "StrongPassword123%"
}
JWT Authorization Header (For Protected Routes)
makefile
CopyEdit
Authorization: Bearer <token>
________________________________________
Error Handling
•	400 Bad Request: Validation errors (missing fields, invalid email, weak password)
•	401 Unauthorized: Invalid token or user not logged in
•	403 Forbidden: Attempting unauthorized access
•	404 Not Found: Resource not found
•	500 Internal Server Error: Server crash or misconfiguration

## Milestone 3 – Admin Panel & Cloudinary Integration

This milestone focuses on improving the Admin Panel and image handling pipeline.

###  Key Updates
- **Cloudinary Integration**  
  - All flower images are now uploaded to Cloudinary instead of being stored locally.  
  - Backend automatically saves the Cloudinary URL in MongoDB.  

- **Admin AddFlower Form**  
  - Supports image uploads with preview.  
  - After saving, the Cloudinary-hosted image URL is displayed instantly.  
  - Form layout reorganized for better usability.  

- **Data Consistency**  
  - Old local file paths were migrated to Cloudinary-compatible URLs.  
  - New flowers fetch seamlessly with no placeholder issues.  

###  Developer Notes
- Environment variables (stored in `.env`):  
  ```env
  CLOUD_NAME=your_cloud_name
  CLOUD_KEY=your_api_key
  CLOUD_SECRET=your_api_secret



## Presentation Link(Loom Video) Milestone 1
[[Presentation Link](https://www.loom.com/share/01d3878d146f48498fc133eb910dd095?sid=70aa91f3-b4e5-452a-b78b-46056c6b2a0b)]

## Presentation Link(Loom Video) Milestone 2
[[Presentation Link](https://www.loom.com/share/69083b5e6a0140b2baeab91725fa6da4?sid=74ad1d57-125d-4e68-b64d-188528542952)]

## Presentation Link(Loom Video) Milestone 3
[[Presentation Link]()]


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
