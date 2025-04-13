from flask_pymongo import PyMongo
from typing import Optional

# Global variable to hold the MongoDB connection
mongo: Optional[PyMongo] = None

def init_mongo(app):
    """Initialize MongoDB connection"""
    global mongo
    mongo = PyMongo(app)
    return mongo

def get_mongo():
    """Get MongoDB connection"""
    global mongo
    if mongo is None:
        raise RuntimeError("MongoDB connection not initialized")
    return mongo
