from functools import wraps
from flask import request, jsonify, Response
from marshmallow import Schema, fields, validate, ValidationError, validates_schema
from typing import Dict, Any, Callable, Tuple, TypeVar, cast, List, Union

# Define a type variable for the decorated function
F = TypeVar('F', bound=Callable[..., Any])

class LoginSchema(Schema):
    email = fields.Email(required=True, error_messages={"required": "Email is required"})
    password = fields.Str(required=True, error_messages={"required": "Password is required"})

class RegisterSchema(LoginSchema):
    password = fields.Str(
        required=True,
        validate=validate.Length(min=6),
        error_messages={
            "required": "Password is required",
            "validate": "Password must be at least 6 characters long"
        }
    )
    confirmPassword = fields.Str(required=True)

    @validates_schema
    def validate_password(self, data: Dict[str, Any], **kwargs: Any) -> None:
        if data.get("password") != data.get("confirmPassword"):
            raise ValidationError("Passwords do not match")

def validate_schema(schema_class: type) -> Callable[[F], F]:
    def decorator(f: F) -> F:
        @wraps(f)
        def decorated_function(*args: Any, **kwargs: Any) -> Union[Tuple[Response, int], Any]:
            schema = schema_class()
            try:
                schema.load(request.get_json())
            except ValidationError as err:
                return jsonify({
                    "status": "error",
                    "message": "; ".join([
                        f"{field}: {', '.join(messages)}"
                        for field, messages in err.messages.items()
                    ])
                }), 400
            return f(*args, **kwargs)
        return cast(F, decorated_function)
    return decorator

validate_login = validate_schema(LoginSchema)
validate_register = validate_schema(RegisterSchema)