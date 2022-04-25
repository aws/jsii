import json
import setuptools


with open("src/jsii/_metadata.json") as fp:
    metadata = json.load(fp)


with open("README.md", encoding="utf8") as fp:
    long_description = fp.read()


setuptools.setup(
    name="jsii",
    version=metadata["version"],
    license=metadata["license"],
    url=metadata["homepage"],
    project_urls={
        "Bug Tracker": metadata["bugs"],
        "Source": metadata["repository"],
    },
    description=metadata["description"],
    long_description=long_description,
    long_description_content_type="text/markdown",
    author=metadata["author"],
    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src"),
    package_data={
        "jsii": ["_metadata.json", "py.typed"],
        "jsii._embedded.jsii": ["*.js", "*.js.map"],
    },
    install_requires=[
        "attrs~=21.2",
        "cattrs>=1.8,<22.2",
        "python-dateutil",
        "typing_extensions>=3.7,<5.0",
    ],
    python_requires="~=3.7",
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: Apache Software License",
        "Programming Language :: JavaScript",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Topic :: Software Development :: Libraries",
        "Topic :: Utilities",
        "Typing :: Typed",
    ],
)
