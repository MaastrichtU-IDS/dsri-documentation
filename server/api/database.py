import os

from sqlmodel import SQLModel, create_engine

from api.config import settings

engine = create_engine(
    settings.SQL_URL,
    pool_pre_ping=True,
    pool_recycle=3600,
    echo=False
)
# Use echo=True to see the details of all SQL transactions done by SQLalchemy


def init_db() -> None:
    SQLModel.metadata.create_all(engine)

