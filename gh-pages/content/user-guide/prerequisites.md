# Prerequisites

## Common Runtime

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

!!! info
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

## Other Languages

When developing _jsii modules_, the SDK for each desired target language must be available for `jsii-pacmak` to be able
to produce releasable artifacts.

| Language/Platform | SDK Requirement             | :octicons-desktop-download-24: Download Locations                        |
| ----------------- | --------------------------- | ------------------------------------------------------------------------ |
| .NET              | .NET Core >= 3.1 / .NET 5.0 | [Download .NET][dl-dotnet]                                               |
| Go                | Go >= 1.15                  | [Download Go][dl-go]                                                     |
| Java              | JDK >= 8 *and* Maven >= 3.6 | [OpenJDK][dl-openjdk] / [Amazon Corretto][dl-corretto] / [Maven][dl-mvn] |
| Python            | Python >= 3.6               | [Download Python][dl-python]                                             |

[dl-dotnet]: https://dotnet.microsoft.com/download
[dl-go]: https://golang.org/dl/
[dl-openjdk]: https://openjdk.java.net/install/index.html
[dl-corretto]: https://aws.amazon.com/fr/corretto/
[dl-mvn]: https://maven.apache.org/download.cgi
[dl-python]: https://www.python.org/downloads/
