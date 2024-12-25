# Express Authentication App

A simple authentication system built with Express.js and MongoDB, featuring user registration, login, and session management.

## Features

- User registration with password hashing
- Secure login system
- Session-based authentication
- Session timeout (30 seconds)
- Visual countdown timer
- Automatic session checking
- Secure logout functionality

## Prerequisites

- Node.js
- MongoDB (running on localhost:27017)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Required dependencies:
```json
{
  "express": "^4.x.x",
  "mongoose": "^6.x.x",
  "express-session": "^1.x.x",
  "bcrypt": "^5.x.x",
  "cors": "^2.x.x"
}
```

## Project Structure

```
.
├── server.js           # Main application file
├── routes
│   └── authRoutes.js   # Authentication route handlers
├── models
│   └── User.js        # User model (not shown in files)
└── views
    ├── login.html     # Login page
    ├── register.html  # Registration page
    └── greeting.html  # Welcome page after login
```

## Configuration

The application uses the following default configuration:

- Server runs on port 3000
- MongoDB connects to `mongodb://localhost:27017/authdb`
- Session timeout is set to 30 seconds
- CORS is enabled for `http://localhost:3000`

## Security Features

- Password hashing using bcrypt
- HTTP-only session cookies
- CORS protection
- Session-based authentication
- Automatic session timeout
- Protected routes using session middleware

## Routes

- GET `/auth/register` - Registration page
- POST `/auth/register` - Create new user
- GET `/auth/login` - Login page
- POST `/auth/login` - Authenticate user
- GET `/auth/greeting` - Welcome page (protected)
- GET `/auth/check-session` - Verify session status
- POST `/auth/logout` - End user session

## Usage

1. Start MongoDB server
2. Run the application:
```bash
node server.js
```
3. Access the application at `http://localhost:3000/auth/login`

## Session Management

- Sessions expire after 30 seconds of inactivity
- Visual countdown timer shows remaining session time
- Automatic redirect to login page on session expiration
- Regular session checks prevent unauthorized access

## Contributing

Feel free to submit issues and pull requests.

## License

[MIT License](LICENSE)