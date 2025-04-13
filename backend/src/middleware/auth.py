from functools import wraps
from flask import jsonify, Response
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from src.config.db import get_mongo
from bson import ObjectId
from typing import Callable, Any, TypeVar, cast, Tuple, Union

# Define a type variable for the decorated function
F = TypeVar('F', bound=Callable[..., Any])

def protected_route(f: F) -> F:
    @wraps(f)
    def decorated(*args: Any, **kwargs: Any) -> Union[Tuple[Response, int], Any]:
        verify_jwt_in_request()
        
        # Get user ID from JWT
        user_id: str = get_jwt_identity()
        
        # Get MongoDB connection
        mongo = get_mongo()
        
        # Check if user still exists
        user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({
                "status": "error",
                "message": "User no longer exists"
            }), 401
            
        return f(*args, **kwargs)
    return cast(F, decorated)