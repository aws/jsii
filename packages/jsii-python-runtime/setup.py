import json
import setuptools


with open("src/jsii/_metadata.json") as fp:
    metadata = json.load(fp)


with open("README.md") as fp:
    long_description = fp.read()


setuptools.setup(
    name="jsii",
    version=metadata["version"],

    description=metadata["description"],
    long_description=long_description,
    long_description_content_type="text/markdown",

    author=metadata["author"],

    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src"),
    package_data={
        "jsii": ["_metadata.json", "py.typed"],
        "jsii._embedded.jsii": ["*.js", "*.js.map", "*.wasm"],
    },

    install_requires=[
        "attrs>=18.2",
        "cattrs",
        "importlib_resources ; python_version < '3.7'",
        "python-dateutil",
        "typing_extensions>=3.6.4",
        "mypy_extensions>=0.4.0",
    ],

    python_requires=">=3.6",

    classifiers=[
        "Development Status :: 4 - Beta",

        "Intended Audience :: Developers",

        "License :: OSI Approved :: Apache Software License",

        "Programming Language :: JavaScript",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",

        "Topic :: Software Development :: Code Generators",
        "Topic :: Utilities",

        "Typing :: Typed",
    ],
)
