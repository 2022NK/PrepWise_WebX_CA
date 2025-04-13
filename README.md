# PrepWise - Career Preparation Platform

PrepWise is an AI-powered career preparation platform that delivers personalized roadmaps to help users navigate and achieve their career goals efficiently..

## Project Overview

This project has been converted from a Node.js/Express/React stack to a Flask/MongoDB/React stack with TypeScript-like type annotations.

### Technology Stack

#### Backend
- Flask (Python)
- MongoDB with PyMongo
- JWT Authentication
- Marshmallow for validation

#### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios for API requests

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 16+
- MongoDB

### Installation

#### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/prepwise
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=3600
   PORT=5000
   FLASK_ENV=development
   ```

6. Run the backend server:
   ```
   python run.py
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

## Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── app.py           # Main Flask application
│   ├── config/
│   │   └── db.py        # MongoDB connection
│   ├── controllers/
│   │   └── auth_controller.py
│   ├── middleware/
│   │   ├── auth.py
│   │   ├── error_handler.py
│   │   └── validators.py
│   ├── models/
│   │   └── user.py
│   └── routes/
│       └── auth_routes.py
└── run.py               # Application entry point
```

### Frontend Structure
```
frontend/
├── src/
│   ├── api/
│   │   ├── auth.ts      # Authentication API functions
│   │   ├── client.ts    # Axios client configuration
│   │   ├── dashboard.ts # Dashboard API functions
│   │   ├── index.ts     # API exports
│   │   └── roadmap.ts   # Roadmap API functions
│   ├── components/
│   │   └── PrivateRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── AuthPages.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LandingPage.tsx
│   │   └── RoadmapPage.tsx
│   ├── App.tsx
│   └── main.tsx
```

## Authentication Flow

1. User registers or logs in through the `/auth` page
2. Backend validates credentials and returns a JWT token
3. Frontend stores the token in localStorage
4. Protected routes check for valid token before rendering
5. API requests include the token in the Authorization header

## Development Guidelines

### Type Safety

- Backend uses Python type hints for TypeScript-like type annotations
- Frontend uses TypeScript interfaces for type safety
- API responses and requests are typed for better development experience

### API Structure

- All API endpoints are prefixed with `/api`
- Authentication routes: `/api/login`, `/api/signup`
- Protected routes require a valid JWT token

## Deployment

The application can be deployed to any platform that supports Python and Node.js applications. For production deployment, make sure to:

1. Set appropriate environment variables
2. Configure CORS settings for production domains
3. Use a production-ready MongoDB instance
4. Set up proper error logging and monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
