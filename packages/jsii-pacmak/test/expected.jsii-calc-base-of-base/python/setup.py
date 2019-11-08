import json
import setuptools

kwargs = json.loads("""
{
    "name": "scope.jsii-calc-base-of-base",
    "version": "0.20.2",
    "description": "An example transitive dependency for jsii-calc.",
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
            "jsii-calc-base-of-base@0.20.2.jsii.tgz"
        ],
        "scope.jsii_calc_base_of_base": [
            "py.typed"
        ]
    },
    "python_requires": ">=3.6",
    "install_requires": [
        "jsii~=0.20.2",
        "publication>=0.0.3"
    ]
}
""")

with open('README.md') as fp:
    kwargs['long_description'] = fp.read()


setuptools.setup(**kwargs)
