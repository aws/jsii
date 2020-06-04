import json
import setuptools

kwargs = json.loads("""
{
    "name": "scope.jsii-calc-lib",
    "version": "0.0.0",
    "description": "A simple calcuator library built on JSII.",
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
        "scope.jsii_calc_lib",
        "scope.jsii_calc_lib._jsii",
        "scope.jsii_calc_lib.custom_submodule_name"
    ],
    "package_data": {
        "scope.jsii_calc_lib._jsii": [
            "jsii-calc-lib@0.0.0.jsii.tgz"
        ],
        "scope.jsii_calc_lib": [
            "py.typed"
        ]
    },
    "python_requires": ">=3.6",
    "install_requires": [
        "jsii>=0.0.0, <0.0.1",
        "publication>=0.0.3",
        "scope.jsii-calc-base>=0.0.0, <0.0.1",
        "scope.jsii-calc-base-of-base>=0.0.0, <0.0.1"
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
        "Development Status :: 7 - Inactive",
        "License :: OSI Approved"
    ]
}
""")

with open('README.md') as fp:
    kwargs['long_description'] = fp.read()


setuptools.setup(**kwargs)
