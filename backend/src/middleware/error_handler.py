from flask import jsonify, Response, Flask
from werkzeug.exceptions import HTTPException
from typing import Tuple, Dict, Any, Optional, Union

class CustomError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        super().__init__()
        self.message: str = message
        self.status_code: int = status_code

def init_error_handlers(app: Flask) -> None:
    @app.errorhandler(CustomError)
    def handle_custom_error(error: CustomError) -> Tuple[Response, int]:
        response: Dict[str, Any] = {
            "status": "error",
            "message": error.message
        }
        return jsonify(response), error.status_code

    @app.errorhandler(HTTPException)
    def handle_http_error(error: HTTPException) -> Tuple[Response, int]:
        response: Dict[str, Any] = {
            "status": "error",
            "message": error.description
        }
        return jsonify(response), error.code

    @app.errorhandler(Exception)
    def handle_generic_error(error: Exception) -> Tuple[Response, int]:
        response: Dict[str, Any] = {
            "status": "error",
            "message": "An unexpected error occurred"
        }
        if app.debug:
            response["debug_message"] = str(error)
        return jsonify(response), 500