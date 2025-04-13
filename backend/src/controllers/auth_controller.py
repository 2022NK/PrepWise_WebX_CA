from flask import jsonify, current_app, Request, Response
from flask_jwt_extended import create_access_token
import bcrypt
from datetime import timedelta
import requests
import json
import os
from typing import Dict, Any, Tuple, Union, Optional
from src.models.user import User
from src.config.db import get_mongo

def register_user(request: Request) -> Tuple[Response, int]:
    data = request.get_json()
    email: str = data.get('email')
    password: str = data.get('password')

    # Get MongoDB connection
    mongo = get_mongo()

    # Check if user already exists
    if mongo.db.users.find_one({"email": email}):
        return jsonify({
            "status": "error",
            "message": "Email already in use"
        }), 400

    # Hash password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

    # Create user
    user = User(email=email, password=hashed_password)
    mongo.db.users.insert_one(user.to_dict())

    # Generate token
    access_token = create_access_token(
        identity=str(user.id),
        expires_delta=timedelta(seconds=int(current_app.config['JWT_ACCESS_TOKEN_EXPIRES']))
    )

    return jsonify({
        "status": "success",
        "token": access_token,
        "data": {
            "user": {
                "id": str(user.id),
                "email": user.email
            }
        }
    }), 201

def login_user(request: Request) -> Tuple[Response, int]:
    data = request.get_json()
    email: str = data.get('email')
    password: str = data.get('password')

    # Get MongoDB connection
    mongo = get_mongo()

    # Find user
    user_data = mongo.db.users.find_one({"email": email})
    if not user_data:
        return jsonify({
            "status": "error",
            "message": "Incorrect email or password"
        }), 401

    user = User.from_dict(user_data)

    # Verify password
    if not bcrypt.checkpw(password.encode('utf-8'), user.password):
        return jsonify({
            "status": "error",
            "message": "Incorrect email or password"
        }), 401

    # Generate token
    access_token = create_access_token(
        identity=str(user.id),
        expires_delta=timedelta(seconds=int(current_app.config['JWT_ACCESS_TOKEN_EXPIRES']))
    )

    return jsonify({
        "status": "success",
        "token": access_token,
        "data": {
            "user": {
                "id": str(user.id),
                "email": user.email,
                "name": user.name,
                "picture": user.picture
            }
        }
    }), 200

def google_auth_callback(code: str) -> Tuple[Response, int]:
    """
    Handle Google OAuth callback and user authentication
    """
    try:
        # Exchange authorization code for tokens
        token_url = "https://oauth2.googleapis.com/token"
        client_id = os.getenv("GOOGLE_CLIENT_ID")
        client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
        redirect_uri = "http://localhost:5000/api/auth/google/callback"
        
        token_data = {
            "code": code,
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code"
        }
        
        token_response = requests.post(token_url, data=token_data)
        
        if token_response.status_code != 200:
            return jsonify({
                "status": "error",
                "message": "Failed to get access token from Google"
            }), 400
            
        token_json = token_response.json()
        access_token = token_json.get("access_token")
        
        # Get user info from Google
        user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        user_info_response = requests.get(
            user_info_url,
            headers={"Authorization": f"Bearer {access_token}"}
        )
        
        if user_info_response.status_code != 200:
            return jsonify({
                "status": "error",
                "message": "Failed to get user info from Google"
            }), 400
            
        user_info = user_info_response.json()
        
        # Extract user data
        google_id = user_info.get("id")
        email = user_info.get("email")
        name = user_info.get("name")
        picture = user_info.get("picture")
        
        if not email:
            return jsonify({
                "status": "error",
                "message": "Email not provided by Google"
            }), 400
            
        # Get MongoDB connection
        mongo = get_mongo()
        
        # Check if user exists by Google ID
        existing_user = mongo.db.users.find_one({"google_id": google_id})
        
        if not existing_user:
            # Check if user exists by email
            existing_user = mongo.db.users.find_one({"email": email})
            
            if existing_user:
                # Update existing user with Google info
                mongo.db.users.update_one(
                    {"_id": existing_user["_id"]},
                    {"$set": {
                        "google_id": google_id,
                        "name": name,
                        "picture": picture
                    }}
                )
                user = User.from_dict(existing_user)
                user.google_id = google_id
                user.name = name
                user.picture = picture
            else:
                # Create new user
                user = User(
                    email=email,
                    google_id=google_id,
                    name=name,
                    picture=picture
                )
                mongo.db.users.insert_one(user.to_dict())
        else:
            # User exists, update info if needed
            if name != existing_user.get("name") or picture != existing_user.get("picture"):
                mongo.db.users.update_one(
                    {"_id": existing_user["_id"]},
                    {"$set": {
                        "name": name,
                        "picture": picture
                    }}
                )
            user = User.from_dict(existing_user)
            
        # Generate JWT token
        access_token = create_access_token(
            identity=str(user.id),
            expires_delta=timedelta(seconds=int(current_app.config['JWT_ACCESS_TOKEN_EXPIRES']))
        )
        
        return jsonify({
            "status": "success",
            "token": access_token,
            "data": {
                "user": {
                    "id": str(user.id),
                    "email": user.email,
                    "name": user.name,
                    "picture": user.picture
                }
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Google authentication failed: {str(e)}"
        }), 500