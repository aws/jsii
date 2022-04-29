# Contributing Guidelines

Thank you for your interest in contributing to our project. Whether it's a bug
report, new feature, correction, or additional documentation, we greatly value
feedback and contributions from our community.

Please read through this document before submitting any issues or pull requests
to ensure we have all the necessary information to effectively respond to your
bug report or contribution.

## Development

To setup a development environment, you'll need
[Node.js](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/).

Fresh full build:

1. Clone the repo
2. Run `yarn install`
3. Run `yarn build`

You can also use these more granular scripts:

- `yarn compile`: compile code to JavaScript
- `yarn watch`: watch in the background and compile
- `yarn test`: run all tests and linters
- `yarn compat`: check that APIs do not introduce breaking changes
- `yarn lint`: run eslint and API compatibility

### Docker Build

If you want to use docker to build, test and package your work use the following:

```shell script
docker build -t constructs .
```

### Using a local version of this library in a dependency

If you're doing changes to this library,
you often want to test them being used in a real dependency
(for example, the [AWS CDK](https://github.com/aws/aws-cdk))
to verify the changes work like expected.
To make that easier,
this repository includes a script in the `scripts`
directory that overwrites the version of `constructs`
in a dependency's `node_modules`
with a symbolic link to the local version of `constructs`:

```shell script
cd my/project/that/uses/constructs/library
/path/to/source/of/constructs/scripts/link.sh
```

## Reporting Bugs/Feature Requests

We welcome you to use the GitHub issue tracker to report bugs or suggest
features.

When filing an issue, please check existing open, or recently closed, issues to
make sure somebody else hasn't already reported the issue. Please try to include
as much information as you can. Details like these are incredibly useful:

* A reproducible test case or series of steps
* The version of our code being used
* Any modifications you've made relevant to the bug
* Anything unusual about your environment or deployment

## Contributing via Pull Requests

Contributions via pull requests are much appreciated. Before sending us a pull
request, please ensure that:

1. You are working against the latest source on the *master* branch.
2. You check existing open, and recently merged, pull requests to make sure
   someone else hasn't addressed the problem already.
3. You open an issue to discuss any significant work - we would hate for your
   time to be wasted.

To send us a pull request, please:

1. Fork the repository.
2. Modify the source; please focus on the specific change you are contributing.
   If you also reformat all the code, it will be hard for us to focus on your
   change.
3. Ensure local tests pass.
4. Commit to your fork using clear commit messages.
5. Send us a pull request, answering any default questions in the pull request
   interface.
6. Pay attention to any automated CI failures reported in the pull request, and
   stay involved in the conversation.

GitHub provides additional document on [forking a
repository](https://help.github.com/articles/fork-a-repo/) and [creating a pull
request](https://help.github.com/articles/creating-a-pull-request/).


## Finding contributions to work on

Looking at the existing issues is a great way to find something to contribute
on. As our projects, by default, use the default GitHub issue labels
(enhancement/bug/duplicate/help wanted/invalid/question/wontfix), looking at any
'help wanted' issues is a great place to start.


## Code of Conduct

This project has adopted the [Amazon Open Source Code of
Conduct](https://aws.github.io/code-of-conduct). For more information see the
[Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq) or contact
opensource-codeofconduct@amazon.com with any additional questions or comments.

## Security issue notifications

If you discover a potential security issue in this project we ask that you
notify AWS/Amazon Security via our [vulnerability reporting
page](http://aws.amazon.com/security/vulnerability-reporting/). Please do
**not** create a public github issue.

## Releasing a New Version

To release a new version, run `yarn bump` which will:"

- Calculate the next version (minor/patch) based on [conventional
  commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Update the [CHANGELOG](./CHANGELOG.md).
- Create a git commit and tag.

Then, execute:

```shell
git push --follow-tags origin master
```

Once the commit is pushed to master, the [release
workflow](./.github/workflows/release.yml) will be triggered and the new version
will be published to all package managers.

## Licensing

See the [LICENSE](LICENSE) file for our project's licensing. We will ask you to
confirm the licensing of your contribution.

We may ask you to sign a [Contributor License Agreement
(CLA)](http://en.wikipedia.org/wiki/Contributor_License_Agreement) for larger
changes.
