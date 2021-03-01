# Set Up

## Creating a new _npm_ package

Start by creating a new empty _npm_ package:

```console
# mkdir project-name
# cd project-name
# npm init -y
Wrote to /Users/rmuller/Downloads/project-name/package.json:

{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## Adding mandatory metadata

Then, add the mandatory information to the new `package.json` file that was created. Specifically, _jsii modules_ must
have an `author` and `repository` setting (those are necessary to generate _valid_ libraries for certain distribution
points, such as _Maven Central_):

```json hl_lines="4 10-13 14-16"
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "A demonstration jsii library",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": {
    "name": "John Doe",
    "email": "john.doe@acme.com"
  },
  "repository": {
    "url": "https://github.com/acme/project-name.git"
  },
  "license": "ISC"
}
```

!!! important
    Before publishing your work, be sure to review the [Important License Information][license-info] documentation.

    [license-info]: ../configuration/index.md#important-license-information

## Setting up the _jsii_ configuration

Finish up the configuration by running `jsii-config`, and letting the assistant guide you through the process:

```console
# npx jsii-config
? Target Languages (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯ java
 ◯ python
 ◯ dotnet
...
Success!
```

## Install Dependencies

Now, you're ready to install the basic tools into the packages' dependency closure. The exact instructions depend on the
**JavaScript** package manager you want to be using:

=== "yarn"

    ```console
    # yarn add -D jsii jsii-pacmak
    yarn add v1.22.10
    info No lockfile found.
    [1/4] 🔍  Resolving packages...
    [2/4] 🚚  Fetching packages...
    [3/4] 🔗  Linking dependencies...
    [4/4] 🔨  Building fresh packages...
    success Saved lockfile.
    success Saved 66 new dependencies.
    ...
    ```

=== "npm"

    ```console
    # npm install --save-dev jsii jsii-pacmak

    added 107 packages, and audited 107 packages in 4s

    39 packages are looking for funding
      run `npm fund` for details

    found 0 vulnerabilities
    ```

## Set up essential scripts

Finally, you might want to configure convenience scripts in your `package.json` file in order to facilitate working with
your project:

```json hl_lines="7-9"
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "A demonstration jsii library",
  "main": "index.js",
  "scripts": {
    "build": "jsii",
    "build:watch": "jsii --watch",
    "package": "jsii-pacmak"
  },
  "keywords": []
  // ...
}
```

Those scripts have the following effect:

| Script        | Description                                       |
| ------------- | ------------------------------------------------- |
| `build`       | Compiles the project                              |
| `build:watch` | Watches for file changes and recompiles as needed |
| `package`     | Generates libraries for all languages             |
