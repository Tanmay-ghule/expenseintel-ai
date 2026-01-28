from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from database import get_db
from models import User
from auth import SECRET_KEY, ALGORITHM

# OAuth2 scheme for extracting Bearer token from Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# -------------------------------------------------------------------
# Dependency: Get Current Authenticated User
# -------------------------------------------------------------------

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    """
    Decode JWT token, validate it, and return the authenticated user.
    This dependency is used to protect private routes.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")

        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return user
