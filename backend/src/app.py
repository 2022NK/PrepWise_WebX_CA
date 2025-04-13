from flask import Flask, jsonify, Response
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from typing import Dict, Any, Union, Tuple, Optional

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)

# Configure app
app.config["MONGO_URI"] = os.getenv("MONGODB_URI", "mongodb://localhost:27017/prepwise")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "your-secret-key")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = int(os.getenv("JWT_EXPIRES_IN", "3600"))

# Google OAuth Configuration
app.config["GOOGLE_CLIENT_ID"] = os.getenv("GOOGLE_CLIENT_ID")
app.config["GOOGLE_CLIENT_SECRET"] = os.getenv("GOOGLE_CLIENT_SECRET")
app.config["FRONTEND_URL"] = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Initialize extensions
from src.config.db import init_mongo
mongo = init_mongo(app)
jwt = JWTManager(app)
CORS(app)

# Initialize error handlers
from src.middleware.error_handler import init_error_handlers
init_error_handlers(app)

# Register blueprints
from src.routes.auth_routes import auth_bp
app.register_blueprint(auth_bp, url_prefix="/api")

@app.route("/")
def health_check() -> Response:
    return jsonify({
        "status": "success",
        "message": "PrepWise API is running"
    })

# JWT error handlers
@jwt.invalid_token_loader
def invalid_token_callback(error: str) -> Tuple[Response, int]:
    return jsonify({
        "status": "error",
        "message": "Invalid token"
    }), 401

@jwt.expired_token_loader
def expired_token_callback(jwt_header: Dict[str, Any], jwt_data: Dict[str, Any]) -> Tuple[Response, int]:
    return jsonify({
        "status": "error",
        "message": "Token has expired"
    }), 401

@jwt.unauthorized_loader
def missing_token_callback(error: str) -> Tuple[Response, int]:
    return jsonify({
        "status": "error",
        "message": "Authorization token is missing"
    }), 401

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=os.getenv("FLASK_ENV") == "development")