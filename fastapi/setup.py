from setuptools import setup, find_packages

setup(
    name='RD-FAIRmetric-F4',
    version='0.1.0',
    url='https://github.com/LUMC-BioSemantics/RD-FAIRmetric-F4.git',
    author='Vincent Emonet',
    author_email='vincent.emonet@gmail.com',
    description='RD-FAIRmetric-F4',
    packages=find_packages(),
    install_requires=open("requirements.txt", "r").readlines(),
)