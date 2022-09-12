from pydantic import BaseSettings, validator


class Settings(BaseSettings):
    API_PASSWORD: str = 'password'

    CLUSTER_USER: str = 'dsri_user'
    CLUSTER_PASSWORD: str = 'password'
    CLUSTER_URL: str = 'https://api.dsri2.unimaas.nl:6443'

    ENABLE_CRON: bool = False

    # TODO: SQL_URL not handled through settings, currently still got through os.getenv()
    SQL_URL: str

    @validator('SQL_URL', pre=True)
    def gen_sql_url(cls, v, values):
        return f"mysql://dsri-user:{values.get('PASSWORD')}@mysql:3306/dsri-db"

    class Config:
        case_sensitive = True


settings = Settings()

