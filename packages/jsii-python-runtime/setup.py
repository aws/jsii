import json
import setuptools


with open("src/jsii/_metadata.json") as fp:
    metadata = json.load(fp)


setuptools.setup(
    name="jsii",
    version=metadata["version"],
    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src"),
    package_data={
        "jsii": ["_metadata.json", "py.typed"],
        "jsii._embedded.jsii": ["*.js", "*.js.map", "*.wasm"],
    },
    install_requires=[
        "attrs",
        "cattrs",
        "importlib_resources ; python_version < '3.7'",
        "python-dateutil",
        "typing_extensions>=3.6.4",
        "mypy_extensions>=0.4.0",
    ],
    python_requires=">=3.6",
)
