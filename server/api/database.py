import os

from sqlmodel import SQLModel, create_engine

# Use echo=True to see the details of all SQL transactions done by SQLalchemy

engine = create_engine(os.getenv('SQL_URL'), pool_pre_ping=True, pool_recycle=3600, echo=False)


def init_db() -> None:
    SQLModel.metadata.create_all(engine)

