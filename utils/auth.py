


from functools import wraps
import jwt
from flask import request, jsonify
from config import Config

def generate_token(user_id: str) -> str:
    """Generate JWT token for authentication"""
    payload = {"sub": user_id}
    return jwt.encode(payload, Config.JWT_SECRET, algorithm="HS256")

def verify_token(token: str) -> dict:
    """Verify JWT token and return payload"""
    try:
        return jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
    except jwt.PyJWTError:
        return None

def jwt_required(f):
    """Decorator to require JWT authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token or not token.startswith("Bearer "):
            return jsonify({"error": "Missing or invalid token"}), 401
        
        token = token.split(" ")[1]
        payload = verify_token(token)
        if not payload:
            return jsonify({"error": "Invalid or expired token"}), 401
        
        return f(*args, **kwargs)
    return decorated_function


