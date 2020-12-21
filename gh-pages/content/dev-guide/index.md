# Prerequisites

## :fontawesome-brands-node-js: Common Runtime

Whether you are developing _jsii modules_ or consuming them (see [Runtime Architecture]), a compatible `node` runtime
must be available. Current `node` runtime versions support status is as follows:

--8<-- "partials/node-support-table.md"

[runtime architecture]: ../home/runtime-architecture.md

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
