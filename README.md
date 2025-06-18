
SecureShare is a Node.js application that provides secure access to sensitive user data through JWT authentication and AES encryption. This project demonstrates how to implement role-based access control and audit logging for API requests.

## Features

- **JWT Authentication**: Secure login route that generates a JWT containing the username and role (user or admin).
- **Role-Based Access Control**: Protected routes that restrict access based on user roles.
- **AES Encryption**: Functions to encrypt and decrypt sensitive data.
- **Protected API Endpoints**: Secure routes that return sensitive information only if the JWT is valid.
- **CORS Configuration**: Proper CORS setup for local testing.
- **Audit Logging**: Logs each API request with details about who accessed which route and when.
- **Anomaly Detection**: Basic logging for excessive requests in a short time.

## Project Structure

```
secureshare-backend
├── src
│   ├── routes
│   │   ├── auth.js        # Handles user authentication
│   │   ├── account.js     # Protected route for account data
│   │   └── admin.js       # Protected route for admin statistics
│   ├── services
│   │   ├── jwt.js         # JWT helper functions
│   │   ├── aes.js         # AES encryption/decryption functions
│   │   ├── rbac.js        # Role-based access control middleware
│   │   ├── logger.js      # Audit logging service
│   │   └── anomaly.js     # Anomaly detection service
│   ├── app.js             # Entry point of the application
│   └── data
│       └── mockData.js    # Mock data for testing
├── package.json            # NPM configuration file
├── .env                    # Environment variables
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd secureshare-backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```
   JWT_SECRET=<your_jwt_secret>
   AES_SECRET=<your_aes_secret>
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```
2. Access the API at `http://localhost:3000`.

## API Endpoints

- **POST /auth/login**: Authenticate user and return JWT.
- **GET /account/data**: Protected route to get account information (requires valid JWT).
- **GET /admin/stats**: Protected route for admin users only.

