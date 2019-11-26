import json
import setuptools

kwargs = json.loads("""
{
    "name": "scope.jsii-calc-base",
    "version": "0.20.8",
    "description": "An example direct dependency for jsii-calc.",
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
        "scope.jsii_calc_base",
        "scope.jsii_calc_base._jsii"
    ],
    "package_data": {
        "scope.jsii_calc_base._jsii": [
            "jsii-calc-base@0.20.8.jsii.tgz"
        ],
        "scope.jsii_calc_base": [
            "py.typed"
        ]
    },
    "python_requires": ">=3.6",
    "install_requires": [
        "jsii~=0.20.8",
        "publication>=0.0.3",
        "scope.jsii-calc-base-of-base~=0.20.8"
    ],
    "classifiers": [
        "Intended Audience :: Developers",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "License :: OSI Approved"
    ]
}
""")

with open('README.md') as fp:
    kwargs['long_description'] = fp.read()


setuptools.setup(**kwargs)
