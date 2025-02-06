from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

DATABASE_URL = "sqlite:///./roulette.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST, OPTIONS и т.д.)
    allow_headers=["*"],  
)

class SpinResult(Base):
    __tablename__ = "spins"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    prize = Column(String)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/spin")
async def save_spin(user_id: str, prize: str, db: Session = Depends(get_db)):
    spin = SpinResult(user_id=user_id, prize=prize)
    db.add(spin)
    db.commit()
    db.refresh(spin)
    return {"message": "Spin saved", "prize": prize}

@app.get("/spins/{user_id}")
async def get_spins(user_id: str, db: Session = Depends(get_db)):
    spins = db.query(SpinResult).filter(SpinResult.user_id == user_id).all()
    return {"user_id": user_id, "spins": [spin.prize for spin in spins]}

@app.get("/spins/")
async def get_all_spins(db: Session = Depends(get_db)):
    spins = db.query(SpinResult).all()
    return {"spins": [{"user_id": spin.user_id, "prize": spin.prize} for spin in spins]}
