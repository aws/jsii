import json
import setuptools

kwargs = json.loads("""
{
    "name": "jsii-calc",
    "version": "0.21.1",
    "description": "A simple calcuator built on JSII.",
    "license": "Apache-2.0",
    "url": "https://github.com/aws/jsii",
    "long_description_content_type": "text/markdown",
    "author": "Amazon Web Services",
    "project_urls": {
        "Source": "https://github.com/aws/jsii.git"
    },
    "package_dir": {
        "": "src"
    },
    "packages": [
        "jsii_calc",
        "jsii_calc._jsii"
    ],
    "package_data": {
        "jsii_calc._jsii": [
            "jsii-calc@0.21.1.jsii.tgz"
        ],
        "jsii_calc": [
            "py.typed"
        ]
    },
    "python_requires": ">=3.6",
    "install_requires": [
        "jsii~=0.21.1",
        "publication>=0.0.3",
        "scope.jsii-calc-base>=0.21.1, <0.22.0",
        "scope.jsii-calc-base-of-base>=0.21.1, <0.22.0",
        "scope.jsii-calc-lib>=0.21.1, <0.22.0"
    ],
    "classifiers": [
        "Intended Audience :: Developers",
        "Operating System :: OS Independent",
        "Programming Language :: JavaScript",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Typing :: Typed",
        "Development Status :: 4 - Beta",
        "License :: OSI Approved"
    ]
}
""")

with open('README.md') as fp:
    kwargs['long_description'] = fp.read()


setuptools.setup(**kwargs)
