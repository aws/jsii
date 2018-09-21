import json
import setuptools


with open("src/jsii/_metadata.json") as fp:
    metadata = json.load(fp)


setuptools.setup(
    name="jsii",
    version=metadata["version"],
    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src"),
    package_data={"jsii": ["_metadata.json"]},
    install_requires=[
        "attrs",
        "cattrs",
        "importlib_resources ; python_version < '3.7'",
    ],
    python_requires=">=3.6",
)
