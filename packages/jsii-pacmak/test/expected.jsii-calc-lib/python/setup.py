import json
import setuptools

kwargs = json.loads("""
{
    "name": "scope.jsii-calc-lib",
    "version": "0.19.0",
    "description": "A simple calcuator library built on JSII.",
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
        "scope.jsii_calc_lib._jsii"
    ],
    "package_data": {
        "scope.jsii_calc_lib._jsii": [
            "jsii-calc-lib@0.19.0.jsii.tgz"
        ],
        "scope.jsii_calc_lib": [
            "py.typed"
        ]
    },
    "python_requires": ">=3.6",
    "install_requires": [
        "jsii~=0.19.0",
        "publication>=0.0.3",
        "scope.jsii-calc-base~=0.19.0"
    ]
}
""")

with open('README.md') as fp:
    kwargs['long_description'] = fp.read()


setuptools.setup(**kwargs)
