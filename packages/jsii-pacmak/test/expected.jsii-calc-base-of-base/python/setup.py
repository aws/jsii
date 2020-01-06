import json
import setuptools

kwargs = json.loads("""
{
    "name": "scope.jsii-calc-base-of-base",
    "version": "0.21.1",
    "description": "An example transitive dependency for jsii-calc.",
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
        "scope.jsii_calc_base_of_base",
        "scope.jsii_calc_base_of_base._jsii"
    ],
    "package_data": {
        "scope.jsii_calc_base_of_base._jsii": [
            "jsii-calc-base-of-base@0.21.1.jsii.tgz"
        ],
        "scope.jsii_calc_base_of_base": [
            "py.typed"
        ]
    },
    "python_requires": ">=3.6",
    "install_requires": [
        "jsii~=0.21.1",
        "publication>=0.0.3"
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
        "License :: OSI Approved"
    ]
}
""")

with open('README.md') as fp:
    kwargs['long_description'] = fp.read()


setuptools.setup(**kwargs)
