from flask_pymongo import PyMongo
from typing import Optional
import os
from flask import Flask

mongo: Optional[PyMongo] = None

def init_db(app: Flask) -> PyMongo:
    """
    Initialize the MongoDB connection
    
    Args:
        app: Flask application instance
        
    Returns:
        PyMongo instance
    """
    global mongo
    mongo = PyMongo(app)
    return mongo

def get_db() -> PyMongo:
    """
    Get the MongoDB connection
    
    Returns:
        PyMongo instance
    """
    if not mongo:
        raise RuntimeError("Database not initialized. Call init_db first.")
    return mongo
