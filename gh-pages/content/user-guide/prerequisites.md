# Prerequisites

## :fontawesome-brands-node-js: Common Runtime

Whether you are developing _jsii modules_ or consuming them (see [Runtime Architecture]), a compatible `node` runtime
must be available. Current `node` runtime versions support status is as follows:

| Release   | Status                       |
| --------- | ---------------------------- |
| `^10.3.0` | :white_check_mark: Supported |
| `^11.0.0` | :warning: Unsupported        |
| `^12.0.0` | :white_check_mark: Supported |
| `^13.0.0` | :warning: Unsupported        |
| `^14.0.0` | :white_check_mark: Supported |
| `^15.0.0` | :test_tube: Best effort      |

??? question "Status Definitions"
    - **:white_check_mark: Supported**: Long Term Support (LTS) releases  (those with an even major version) are
      supported and bugs specific to those releases are addressed with the highest priority. Every `jsii` release is
      automatically tested against those releases.
    - **:test_tube: Best effort**: Development releases (those with an odd major version) are supported on a best-effort
      basis. No automated testing is performed against those releases.
    - **:warning: Unsupported**: End-of-Life releases are not supported. Bugs affecting those may not be fixed, and
      users are strongly advised to migrate to more recent releases.

    The [node releases schedule][node-releases] provides up-to-date information on the current status of all active
    releases, and indicates the timelines for support (including planned End-of-Life dates for each).

    [node-releases]: https://nodejs.org/en/about/releases/

[runtime architecture]: ../runtime-architecture.md

## :octicons-file-code-24: Other Languages

When developing _jsii modules_, the SDK for each desired target language must be available for `jsii-pacmak` to be able
to produce releasable artifacts.

| Language/Platform | SDK Requirement              |
| ----------------- | ---------------------------- |
| .NET              | .NET Core ≥ 3.1 / .NET ≥ 5.0 |
| Go                | Go ≥ 1.15                    |
| Java              | JDK ≥ 8 *and* Maven ≥ 3.6    |
| Python            | Python ≥ 3.6                 |


## :octicons-desktop-download-24: Download Locations

This table provides typical download locations for the prerequisites mentioned in this document. Most of these tools can
also be installed using traidtional package managers (standard for the operating system and platform).

| Tool            | Description                              | Location                |
| --------------- | ---------------------------------------- | ------------------------|
| .NET            | Official Microsoft .NET SDK distribution | [Download][dl-dotnet]   |
| Amazon Corretto | Amazon's free OpenJDK distribution       | [Download][dl-corretto] |
| Go              | Official Go distribution                 | [Download][dl-go]       |
| OpenJDK         | Oracle OpenJDK distribution              | [Download][dl-openjdk]  |
| Maven           | Official Maven distribution              | [Download][dl-mvn]      |
| Node            | Official NodeJS distribution             | [Download][dl-node]     |

[dl-dotnet]: https://dotnet.microsoft.com/download
[dl-go]: https://golang.org/dl/
[dl-openjdk]: https://openjdk.java.net/install/index.html
[dl-corretto]: https://aws.amazon.com/fr/corretto/
[dl-mvn]: https://maven.apache.org/download.cgi
[dl-python]: https://www.python.org/downloads/
[dl-node]: https://nodejs.org/en/download/
