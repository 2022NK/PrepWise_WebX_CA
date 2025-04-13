from flask import Blueprint, request, jsonify, Response, redirect, url_for, current_app
from src.controllers.auth_controller import register_user, login_user, google_auth_callback
from src.middleware.validators import validate_register, validate_login
from typing import Tuple
import os
from urllib.parse import urlencode

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
@validate_register
def signup() -> Tuple[Response, int]:
    return register_user(request)

@auth_bp.route('/login', methods=['POST'])
@validate_login
def login() -> Tuple[Response, int]:
    return login_user(request)

# Google OAuth routes
@auth_bp.route('/auth/google', methods=['GET'])
def google_auth():
    # Google OAuth configuration
    client_id = os.getenv('GOOGLE_CLIENT_ID')
    # Use the exact redirect URI that's registered in Google Cloud Console
    redirect_uri = "http://localhost:5000/api/auth/google/callback"
    
    # Google OAuth URL
    google_auth_url = "https://accounts.google.com/o/oauth2/v2/auth"
    
    # Parameters for Google OAuth
    params = {
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'response_type': 'code',
        'scope': 'email profile',
        'access_type': 'offline',
        'prompt': 'consent'
    }
    
    # Redirect to Google OAuth
    auth_url = f"{google_auth_url}?{urlencode(params)}"
    return redirect(auth_url)

@auth_bp.route('/auth/google/callback', methods=['GET'])
def google_callback():
    # Get authorization code from query parameters
    code = request.args.get('code')
    
    if not code:
        return jsonify({
            "status": "error",
            "message": "Authorization code not provided"
        }), 400
    
    # Process Google OAuth callback
    result = google_auth_callback(code)
    
    if result[1] != 200:
        # If there's an error, return JSON response
        return result
    
    # On success, redirect to frontend with token and user data
    response_data = result[0].get_json()
    token = response_data.get('token')
    user_data = response_data.get('data', {}).get('user', {})
    
    # Convert user data to proper JSON string
    import json
    user_data_json = json.dumps(user_data)
    
    # Encode user data for URL
    user_data_str = urlencode({'user': user_data_json})
    
    # Redirect to frontend with token and user data
    frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:5173')
    redirect_url = f"{frontend_url}/auth?token={token}&{user_data_str}"
    
    return redirect(redirect_url)