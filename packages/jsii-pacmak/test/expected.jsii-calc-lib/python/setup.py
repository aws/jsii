import json
import setuptools

kwargs = json.loads("""
{
    "name": "scope.jsii-calc-lib",
    "version": "0.8.2",
    "description": "A simple calcuator library built on JSII.",
    "url": "https://github.com/awslabs/jsii.git",
    "long_description_content_type": "text/markdown",
    "author": "Amazon Web Services",
    "project_urls": {
        "Source": "https://github.com/awslabs/jsii.git"
    },
    "package_dir": {
        "": "src"
    },
    "packages": [
        "scope.jsii_calc_lib",
        "scope.jsii_calc_lib._jsii"
    ],
    "package_data": {
        "scope.jsii_calc_lib._jsii": [
            "jsii-calc-lib@0.8.2.jsii.tgz"
        ],
        "scope.jsii_calc_lib": [
            "py.typed"
        ]
    },
    "python_requires": ">=3.6",
    "install_requires": [
        "jsii",
        "publication>=0.0.3",
        "scope.jsii-calc-base~=0.8.2"
    ]
}
""")

with open('README.md') as fp:
    kwargs['long_description'] = fp.read()


setuptools.setup(**kwargs)
