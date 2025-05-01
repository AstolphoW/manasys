from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jose import jwt
from sqlalchemy.orm import Session
from database import SessionLocal, Usuario
from datetime import datetime, timedelta

# Configurações do JWT
SECRET_KEY = "manasys-super-secreto"
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

# Libera o frontend do Render
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://manasys-frontend.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Injetor de sessão do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Modelo de entrada do login
class LoginData(BaseModel):
    email: str
    senha: str

@app.get("/")
def read_root():
    return {"message": "API do Manasys rodando com sucesso"}

# Endpoint de login com validação no banco
@app.post("/login")
def login(data: LoginData, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.email == data.email).first()
    if not usuario or usuario.senha != data.senha:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    expire = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    token = jwt.encode({"sub": usuario.email, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}
