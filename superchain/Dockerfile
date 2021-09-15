########################################################################################################################
# Introduction
########################################################################################################################
# This is a multi-stage build, which eventually results in a squashed image.
# The image intended for release/use is the one obtained using `docker build --target=superchain ...`.
#
# Stages are as follows
# 1. [bindist]    Prepare a bunch of binary distributions
# 2. [staging]    Prepare the superchain staging image
# 3. [superchain] Squash into a single layer
# 4. [test]       Run tests on the superchain stage
#
# Multi-stage build allows several of these steps to run in parallel up to some point. It makes the build cache usage
# more efficient, and allows us to run cross-architecture builds in the most efficient possible manner, by running the
# "platform-independent" elements within the build platform, which does not require any kind of emulation.


########################################################################################################################
# Prepare install images of "manual" binary distributions (runs on BUILD platform for speed)
########################################################################################################################
FROM --platform=${BUILDPLATFORM} public.ecr.aws/debian/debian:10 as bindist

# Build & target platforms, they are provided by buildx and will look like "linux/amd64" or "linux/arm64"
ARG BUILDPLATFORM
ARG TARGETPLATFORM

# We require a couple of tools to be available in order to work here...
RUN apt-get update && apt-get install -y curl gpg tar zsh

# We'll be using zsh substitutions, so ensuring this is the shell we use
SHELL ["/bin/zsh", "-c"]

# Prepare maven binary distribution
ARG M2_VERSION="3.8.2"
ENV M2_DISTRO="https://www.apache.org/dist/maven/maven-3"
RUN set -eo pipefail                                                                                                    \
  && curl -sL "${M2_DISTRO}/${M2_VERSION}/binaries/apache-maven-${M2_VERSION}-bin.tar.gz"                               \
         -o /tmp/apache-maven.tar.gz                                                                                    \
  && curl -sL "${M2_DISTRO}/${M2_VERSION}/binaries/apache-maven-${M2_VERSION}-bin.tar.gz.asc"                           \
          -o /tmp/apache-maven.tar.gz.asc                                                                               \
  && mkdir -p /tmp/gpg-maven && chmod go-rwx /tmp/gpg-maven                                                             \
  && curl -sL "https://www.apache.org/dist/maven/KEYS" | gpg --homedir /tmp/gpg-maven --import                          \
  && gpg --homedir /tmp/gpg-maven --verify /tmp/apache-maven.tar.gz.asc /tmp/apache-maven.tar.gz                        \
  && mkdir -p /opt/apache/maven                                                                                         \
  && tar xzf /tmp/apache-maven.tar.gz -C /opt/apache/maven --strip-components=1

# Prepare .NET Core distribution
ARG DOTNET_CHANNEL="3.1"
ENV DOTNET_FEED="https://dotnetcli.azureedge.net/dotnet"
RUN DOTNET_VERSION=$(curl -fSsL "${DOTNET_FEED}/Sdk/${DOTNET_CHANNEL}/latest.version")                                  \
  && DOTNET_ASSET="dotnet-sdk-${DOTNET_VERSION}-linux-${${TARGETPLATFORM#linux/}/amd64/x64}.tar.gz"                     \
  && curl -fSsL "${DOTNET_FEED}/Sdk/${DOTNET_VERSION}/${DOTNET_ASSET}"                                                  \
    -o /tmp/dotnet.tar.gz                                                                                               \
  && mkdir -p /opt/microsoft/dotnet                                                                                     \
  && tar zxf /tmp/dotnet.tar.gz -C /opt/microsoft/dotnet

# Prepare PowerShell LTS distribution
ENV POWERSHELL_RELEASES="https://github.com/PowerShell/PowerShell/releases"
RUN POWERSHELL_RELEASE=$(curl -fSsL "https://aka.ms/powershell-release?tag=lts" -o /dev/null -w %{url_effective})       \
  && POWERSHELL_VERSION=${POWERSHELL_RELEASE#${POWERSHELL_RELEASES}/tag/v}                                              \
  && ASSET="powershell-${POWERSHELL_VERSION}-linux-${${TARGETPLATFORM#linux/}/amd64/x64}.tar.gz"                        \
  && curl -fSsL "${POWERSHELL_RELEASES}/download/v${POWERSHELL_VERSION}/${ASSET}"                                       \
      -o /tmp/powershell.tar.gz                                                                                         \
  && mkdir -p /opt/microsoft/powershell                                                                                 \
  && tar zxf /tmp/powershell.tar.gz -C /opt/microsoft/powershell                                                        \
  && chmod +x /opt/microsoft/powershell/pwsh

# Prepare Go distribution
ARG GO_VERSION="1.16.7"
RUN curl -fSsL "https://golang.org/dl/go${GO_VERSION}.linux-${TARGETPLATFORM#linux/}.tar.gz" -o /tmp/go.tar.gz          \
  && mkdir -p /opt/golang/go                                                                                            \
  && tar -xzf /tmp/go.tar.gz -C /opt/golang/go --strip-components=1

########################################################################################################################
# Set up the image
########################################################################################################################
FROM public.ecr.aws/debian/debian:10-slim as staging

# Build & target platforms, they are provided by buildx and will look like "linux/amd64" or "linux/arm64"
ARG BUILDPLATFORM
ARG TARGETPLATFORM

SHELL ["/bin/bash", "-c"]

# Set locale and some other interesting environment variables
ENV LANG="C.UTF-8"                                                                                                      \
    LC_ALL="C.UTF-8"                                                                                                    \
    CHARSET="UTF-8"                                                                                                     \
                                                                                                                        \
    DOTNET_RUNNING_IN_CONTAINER="true"                                                                                  \
    DOTNET_USE_POLLING_FILE_WATCHER="true"                                                                              \
    NUGET_XMLDOC_MODE="skip"                                                                                            \
                                                                                                                        \
    M2_HOME="/opt/apache/maven"                                                                                         \
    M2="/opt/apache/maven/bin"                                                                                          \
                                                                                                                        \
    GOROOT="/opt/golang/go"

# Installing the system dependencies we need...
RUN apt-get update                                                                                                      \
  && apt-get -y install                                                                                                 \
                        apt-transport-https                                                                             \
                        build-essential                                                                                 \
                        ca-certificates                                                                                 \
                        curl                                                                                            \
                        dirmngr                                                                                         \
                        git                                                                                             \
                        gnupg                                                                                           \
                        gzip                                                                                            \
                        libicu63                                                                                        \
                        libssl-dev                                                                                      \
                        openssl                                                                                         \
                        rsync                                                                                           \
                        sudo                                                                                            \
                        unzip                                                                                           \
                        zip                                                                                             \
  && rm -rf /var/lib/apt/lists/*

# Install mono
COPY superchain/gpg/mono.asc /tmp/mono.asc
RUN apt-key add /tmp/mono.asc && rm /tmp/mono.asc                                                                       \
  && echo "deb https://download.mono-project.com/repo/debian stable-buster main"                                        \
      > /etc/apt/sources.list.d/mono-official-stable.list                                                               \
  && apt-get update                                                                                                     \
  && apt-get -y install mono-devel                                                                                      \
  && rm -rf /var/lib/apt/lists/*

# Install Python 3
RUN apt-get update                                                                                                      \
  && apt-get -y install python3 python3-pip python3-venv                                                                \
  && python3 -m pip install --no-input --upgrade pip                                                                    \
  && python3 -m pip install --no-input --upgrade awscli black setuptools twine wheel                                    \
  && rm -rf $(pip cache dir)                                                                                            \
  && rm -rf /var/lib/apt/lists/*

# Install Rust (required for https://pypi.org/project/cryptography/ in certain circumstances... like ARM64 arch)
ENV RUSTUP_HOME=/usr/local/rustup                                                                                       \
    CARGO_HOME=/usr/local/cargo
RUN set -eo pipefail                                                                                                    \
  && curl -fSsL "https://sh.rustup.rs" | sh -s -- -y --no-modify-path --profile=minimal                                 \
  && echo "source ${CARGO_HOME}/env" >> /etc/profile.d/cargo.sh                                                         \
  && chmod -R a+rw ${CARGO_HOME}
ENV PATH=$PATH:${CARGO_HOME}/bin

# Install JDK8 (Amazon Corretto 8)
COPY superchain/gpg/corretto.asc /tmp/corretto.asc
RUN apt-key add /tmp/corretto.asc && rm /tmp/corretto.asc                                                               \
  && echo "deb https://apt.corretto.aws stable main" > /etc/apt/sources.list.d/amazon-corretto.list                     \
  && apt-get update                                                                                                     \
  && mkdir -p /usr/share/man/man1                                                                                       \
  && apt-get -y install java-1.8.0-amazon-corretto-jdk                                                                  \
  && rm -rf /usr/share/man/man1                                                                                         \
  && rm -rf /var/lib/apt/lists/*

# Install Docker
COPY superchain/gpg/docker.asc /tmp/docker.asc
RUN apt-key add /tmp/docker.asc && rm /tmp/docker.asc                                                                   \
  && echo "deb https://download.docker.com/linux/debian buster stable" > /etc/apt/sources.list.d/docker.list            \
  && apt-get update                                                                                                     \
  && apt-get -y install docker-ce docker-ce-cli containerd.io                                                           \
  && rm -rf /var/lib/apt/lists/*
VOLUME /var/lib/docker

# Install GitHub CLI
ARG GITHUB_CLI_VERSION="1.13.1"
RUN BASE="https://github.com/cli/cli/releases/download"                                                                 \
  && echo "${BASE}/v${GITHUB_CLI_VERSION}/gh_${GITHUB_CLI_VERSION}_linux_${TARGETPLATFORM#linux/}.deb" \
  && curl -fSsL "${BASE}/v${GITHUB_CLI_VERSION}/gh_${GITHUB_CLI_VERSION}_linux_${TARGETPLATFORM#linux/}.deb"            \
      -o /tmp/gh.deb                                                                                                    \
  && apt-get update                                                                                                     \
  && apt-get -y install /tmp/gh.deb                                                                                     \
  && rm /tmp/gh.deb                                                                                                     \
  && rm -rf /var/lib/apt/lists/*

# Install .NET Core and PowerShell
COPY --from=bindist /opt/microsoft/dotnet /opt/microsoft/dotnet
RUN ln -s /opt/microsoft/dotnet/dotnet /usr/bin/dotnet
COPY --from=bindist /opt/microsoft/powershell /opt/microsoft/powershell
RUN ln -s /opt/microsoft/powershell/pwsh /usr/bin/pwsh

# Install Maven
COPY --from=bindist /opt/apache/maven ${M2_HOME}
COPY superchain/m2-settings.xml /root/.m2/settings.xml

# Install Go
COPY --from=bindist /opt/golang/go ${GOROOT}

# Install Node 10+ (configurable with '--build-arg NODE_MAJOR_VERSION=xxx') and yarn
# (Put this as late as possible in the Dockerfile so we get to reuse the layer cache
# for most of the multiple builds).
ARG NODE_MAJOR_VERSION="12"
COPY superchain/gpg/nodesource.asc /tmp/nodesource.asc
COPY superchain/gpg/yarn.asc /tmp/yarn.asc
RUN apt-key add /tmp/nodesource.asc && rm /tmp/nodesource.asc                                                           \
  && echo "deb https://deb.nodesource.com/node_${NODE_MAJOR_VERSION}.x buster main"                                     \
      > /etc/apt/sources.list.d/nodesource.list                                                                         \
  && apt-key add /tmp/yarn.asc && rm /tmp/yarn.asc                                                                      \
  && echo "deb https://dl.yarnpkg.com/debian stable main" > /etc/apt/sources.list.d/yarnpkg.list                        \
  && apt-get update                                                                                                     \
  && apt-get -y install nodejs yarn                                                                                     \
  && rm -rf /var/lib/apt/lists/*

# Install some configuration
COPY superchain/ssh_config /root/.ssh/config
RUN chmod 600 /root/.ssh/config
COPY superchain/dockerd-entrypoint.sh /usr/local/bin/

# Create the image's non-root user, and enable no-password sudo
RUN adduser --shell /bin/bash --gecos "Docker User" --disabled-password superchain                                      \
  && adduser superchain sudo                                                                                            \
  && echo "%sudo ALL = (ALL) NOPASSWD: ALL" >> /etc/sudoers.d/nopasswd                                                  \
  && chmod 0440 /etc/sudoers.d/nopasswd
COPY --chown=superchain:superchain superchain/m2-settings.xml /home/superchain/.m2/settings.xml
COPY --chown=superchain:superchain superchain/ssh_config /home/superchain/.ssh/config
RUN chmod 600 /home/superchain/.ssh/config

# Add the source used to build this Docker image (to facilitate re-builds, forensics)
COPY superchain /docker-source

CMD ["/bin/bash"]

########################################################################################################################
# Creating squashed image
########################################################################################################################
FROM scratch as superchain
# Set locale and some other interesting environment variables
ENV LANG="C.UTF-8"                                                                                                      \
    LC_ALL="C.UTF-8"                                                                                                    \
    CHARSET="UTF-8"                                                                                                     \
                                                                                                                        \
    DOTNET_CLI_TELEMETRY_OPTOUT="true"                                                                                  \
    DOTNET_RUNNING_IN_CONTAINER="true"                                                                                  \
    DOTNET_NOLOGO="true"                                                                                                \
    DOTNET_USE_POLLING_FILE_WATCHER="true"                                                                              \
    NUGET_XMLDOC_MODE="skip"                                                                                            \
                                                                                                                        \
    M2_HOME="/opt/apache/maven"                                                                                         \
    M2="/opt/apache/maven/bin"                                                                                          \
    MAVEN_OPTS="-Xms256m -Xmx512m"                                                                                      \
                                                                                                                        \
    GOROOT="/opt/golang/go"                                                                                             \
    RUSTUP_HOME="/usr/local/rustup"                                                                                     \
    CARGO_HOME="/usr/local/cargo"
ENV PATH="${PATH}:${CARGO_HOME}/bin:${GOROOT}/bin:${M2}"

COPY --from=staging / /
VOLUME /var/lib/docker

## Image Metadata
ARG BUILD_TIMESTAMP
ARG COMMIT_ID
LABEL org.opencontainers.image.created=${BUILD_TIMESTAMP}                                                               \
      org.opencontainers.image.title="jsii/superchain"                                                                  \
      org.opencontainers.image.description="An image to build cross-language artifacts with AWS jsii"                   \
      org.opencontainers.image.url="https://github.com/aws/jsii/tree/main/superchain"                                   \
      org.opencontainers.image.source="https://github.com/aws/jsii.git"                                                 \
      org.opencontainers.image.revision=$COMMIT_ID                                                                      \
      org.opencontainers.image.authors="Amazon Web Services (https://aws.amazon.com)"

USER superchain:superchain

CMD ["/bin/bash"]

########################################################################################################################
# Running tests
########################################################################################################################
FROM superchain as test
ENV CI=true
COPY --chown=superchain:superchain . /tmp/source
VOLUME /var/lib/docker
WORKDIR /tmp/source
# Make sure we start fresh (symlinks from outside the build may cause issues, e.g: python venvs)
RUN git clean -fqdx
# Install all dependencies again
RUN yarn install --frozen-lockfile
# Build the code
RUN yarn build
# Test the code
RUN yarn test
