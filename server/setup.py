from setuptools import setup, find_packages

setup(
    name='dsri-documentation-api',
    version='0.1.0',
    url='https://github.com/MaastrichtU-IDS/dsri-documentation.git',
    author='Vincent Emonet',
    author_email='vincent.emonet@gmail.com',
    description='DSRI documentation API',
    packages=find_packages(),
    install_requires=open("requirements.txt", "r").readlines(),
)