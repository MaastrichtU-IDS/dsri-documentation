from pydantic import BaseSettings, validator


class Settings(BaseSettings):
    API_PASSWORD: str = 'password'

    # CLUSTER_USER: str = 'dsri_user'
    # CLUSTER_PASSWORD: str = 'password'
    CLUSTER_API_KEY: str = 'token'
    CLUSTER_URL: str = 'https://api.dsri2.unimaas.nl:6443'
    CLUSTER_API_VERSION = 'apps.openshift.io/v1'

    ENABLE_CRON: bool = False

    SQL_URL: str

    # NOTE: automatically generate SQL_URL from DB_PASSWORD env variable
    # @validator('SQL_URL', pre=True)
    # def gen_sql_url(cls, v, values):
    #     return f"mysql://dsri-user:{values.get('DB_PASSWORD')}@mysql:3306/dsri-db"

    class Config:
        case_sensitive = True


settings = Settings()

