from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

# -------------------------------------------------------------------
# JWT Configuration
# -------------------------------------------------------------------

SECRET_KEY = "supersecretkey_change_later"  # Move to env in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Password hashing context (bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -------------------------------------------------------------------
# Password Utilities
# -------------------------------------------------------------------

def hash_password(password: str) -> str:
    """
    Hash a plain text password using bcrypt.
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against its hashed version.
    """
    return pwd_context.verify(plain_password, hashed_password)


# -------------------------------------------------------------------
# JWT Token Utilities
# -------------------------------------------------------------------

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """
    Create a signed JWT access token with expiration.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
