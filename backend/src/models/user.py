from bson import ObjectId
from datetime import datetime
from typing import Dict, Any, Optional

class User:
    def __init__(
        self, 
        email: str, 
        password: Optional[str] = None, 
        id: Optional[ObjectId] = None, 
        created_at: Optional[datetime] = None,
        name: Optional[str] = None,
        picture: Optional[str] = None,
        google_id: Optional[str] = None
    ):
        self.id: ObjectId = id if id else ObjectId()
        self.email: str = email
        self.password: Optional[str] = password
        self.created_at: datetime = created_at if created_at else datetime.utcnow()
        self.name: Optional[str] = name
        self.picture: Optional[str] = picture
        self.google_id: Optional[str] = google_id

    def to_dict(self) -> Dict[str, Any]:
        user_dict = {
            "_id": self.id,
            "email": self.email,
            "created_at": self.created_at
        }
        
        # Add optional fields if they exist
        if self.password:
            user_dict["password"] = self.password
        if self.name:
            user_dict["name"] = self.name
        if self.picture:
            user_dict["picture"] = self.picture
        if self.google_id:
            user_dict["google_id"] = self.google_id
            
        return user_dict

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> 'User':
        return User(
            id=data["_id"],
            email=data["email"],
            password=data.get("password"),
            created_at=data["created_at"],
            name=data.get("name"),
            picture=data.get("picture"),
            google_id=data.get("google_id")
        )