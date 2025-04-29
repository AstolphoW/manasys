from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS – permite que o frontend se comunique com o backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://manasys-frontend.onrender.com"],  # URL do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de dados de login
class LoginData(BaseModel):
    email: str
    senha: str

# Teste simples na rota raiz
@app.get("/")
def read_root():
    return {"message": "Bem-vindo ao Manasys!"}

# Rota de login
@app.post("/login")
def login(data: LoginData):
    if data.email == "admin@manasys.com" and data.senha == "1234":
        return {"message": "Login bem-sucedido!"}
    raise HTTPException(status_code=401, detail="Credenciais inválidas")