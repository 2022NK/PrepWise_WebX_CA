# PrepWise Backend

This is the backend for the PrepWise application, built with Flask, MongoDB, and TypeScript-like type annotations.

## Technology Stack

- **Flask**: Web framework
- **MongoDB**: Database
- **TypeScript-like annotations**: Using Python type hints
- **JWT**: Authentication

## Project Structure

```
backend/
├── mypy.ini              # TypeScript-like type checking configuration
├── requirements.txt      # Python dependencies
├── src/
│   ├── app.py            # Main application entry point
│   ├── config/           # Configuration files
│   │   └── database.py   # MongoDB connection
│   ├── controllers/      # Request handlers
│   │   └── auth_controller.py
│   ├── middleware/       # Middleware functions
│   │   ├── auth.py       # Authentication middleware
│   │   ├── error_handler.py # Error handling middleware
│   │   └── validators.py # Request validation
│   ├── models/           # Data models
│   │   └── user.py       # User model
│   └── routes/           # API routes
│       └── auth_routes.py # Authentication routes
└── .env.example          # Example environment variables
```

## Setup Instructions

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on `.env.example` and update the values.

5. Run the application:
   ```
   python src/app.py
   ```

## Type Checking

To run type checking with mypy:

```
mypy src
```

## API Endpoints

- `POST /api/signup`: Register a new user
- `POST /api/login`: Login a user

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```
