########################################################################################################################
# Set up the image
########################################################################################################################
FROM public.ecr.aws/debian/debian:10-slim as superchain

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
    GEM_HOME="/usr/local/bundle"                                                                                        \
    BUNDLE_SILENCE_ROOT_WARNING="1"                                                                                     \
                                                                                                                        \
    M2_VERSION="3.6.3"                                                                                                  \
    M2_HOME="/usr/local/apache-maven"                                                                                   \
    M2="/usr/local/apache-maven/bin"                                                                                    \
    MAVEN_OPTS="-Xms256m -Xmx512m"                                                                                      \
                                                                                                                        \
    GOROOT="/usr/local/go"                                                                                              \
    GITHUB_CLI_VERSION="1.13.1"

# Build & target platforms, they are provided by buildx and will look like "linux/amd64" or "linux/arm64"
ARG BUILDPLATFORM
ARG TARGETPLATFORM

# Installing tar as it's needed for installing Maven, curl as it's needed to download a bunch of things during the
# build, build-essentials as it would be needed to install any dependency including native components, and a couple of
# generally useful/pervasive packages.
RUN apt-get update                                                                                                      \
  && apt-get -y install apt-transport-https dirmngr gnupg ca-certificates                                               \
                    tar curl                                                                                            \
                    build-essential                                                                                     \
                    git gzip openssl rsync unzip zip                                                                    \
  && rm -rf /var/lib/apt/lists/*

# Install mono
COPY superchain/gpg/mono.asc /tmp/mono.asc
RUN apt-key add /tmp/mono.asc && rm /tmp/mono.asc                                                                       \
  && echo "deb https://download.mono-project.com/repo/debian stable-buster main"                                        \
      > /etc/apt/sources.list.d/mono-official-stable.list                                                               \
  && apt-get update                                                                                                     \
  && apt-get -y install mono-devel                                                                                      \
  && rm -rf /var/lib/apt/lists/*

# Install .NET Core and PowerShell (they don't support ARM binary distributions, unfortunately)
RUN if [ "${TARGETPLATFORM}" = "linux/amd64" ]; then                                                                    \
    curl -SsL "https://packages.microsoft.com/config/debian/10/packages-microsoft-prod.deb"                             \
      -o /tmp/packages-microsoft-prod.deb                                                                               \
    && dpkg -i /tmp/packages-microsoft-prod.deb                                                                         \
    && rm /tmp/packages-microsoft-prod.deb                                                                              \
    && apt-get update                                                                                                   \
    && apt-get -y install dotnet-sdk-3.1 powershell                                                                     \
    && rm -rf /var/lib/apt/lists/*                                                                                      \
  ;else                                                                                                                 \
    curl -SsL "https://dot.net/v1/dotnet-install.sh" -o /tmp/dotnet-install.sh                                          \
    && export DOTNET_HOME="/usr/local/dotnet" && mkdir -p ${DOTNET_HOME}                                                \
    && bash /tmp/dotnet-install.sh --channel 3.1 --install-dir ${DOTNET_HOME}                                           \
    && rm /tmp/dotnet-install.sh                                                                                        \
    && ln -s ${DOTNET_HOME}/bin/dotnet /usr/local/bin/dotnet                                                            \
    && ln -s ${DOTNET_HOME}/bin/nuget /usr/local/bin/nuget                                                              \
    && curl -SsL "https://github.com/PowerShell/PowerShell/releases/download/v7.1.3/powershell-7.1.3-linux-${TARGETPLATFORM#linux/}.tar.gz"\
        -o /tmp/powershell.tar.gz                                                                                       \
    && mkdir -p /opt/microsoft/powershell/7                                                                             \
    &&  tar zxf /tmp/powershell.tar.gz -C /opt/microsoft/powershell/7                                                   \
    && rm /tmp/powershell.tar.gz                                                                                        \
    && chmod +x /opt/microsoft/powershell/7/pwsh                                                                        \
    && ln -s /opt/microsoft/powershell/7/pwsh /usr/bin/pwsh                                                             \
  ;fi

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
RUN curl -SsL "https://sh.rustup.rs" | sh -s -- -y --no-modify-path --profile=minimal                                   \
  && echo "source ${CARGO_HOME}/env" >> /etc/profile.d/cargo.sh
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

# Install Maven
RUN curl -sL "https://www.apache.org/dist/maven/maven-3/${M2_VERSION}/binaries/apache-maven-${M2_VERSION}-bin.tar.gz"   \
         -o /tmp/apache-maven.tar.gz                                                                                    \
  && curl -sL "https://www.apache.org/dist/maven/maven-3/${M2_VERSION}/binaries/apache-maven-${M2_VERSION}-bin.tar.gz.asc"\
          -o /tmp/apache-maven.tar.gz.asc                                                                               \
  && mkdir -p /tmp/gpg-maven && chmod go-rwx /tmp/gpg-maven                                                             \
  && curl -sL "https://www.apache.org/dist/maven/KEYS" | gpg --homedir /tmp/gpg-maven --import                          \
  && gpg --homedir /tmp/gpg-maven --verify /tmp/apache-maven.tar.gz.asc /tmp/apache-maven.tar.gz                        \
  && mkdir -p /usr/local && (cd /usr/local && tar xzf /tmp/apache-maven.tar.gz)                                         \
  && mv /usr/local/apache-maven-${M2_VERSION} /usr/local/apache-maven                                                   \
  && for BIN in $(find /usr/local/apache-maven/bin -type f -executable);                                                \
     do                                                                                                                 \
       ln -s $BIN /usr/local/bin/$(basename $BIN);                                                                      \
     done                                                                                                               \
  && rm -rf /tmp/apache-maven.tar.gz /tmp/apache-maven.tar.gz.asc /tmp/gpg-maven
COPY superchain/m2-settings.xml /root/.m2/settings.xml

# Install Go
RUN curl -SsL "https://golang.org/dl/go1.16.7.linux-${TARGETPLATFORM#linux/}.tar.gz" -o /tmp/go.tar.gz                  \
  && mkdir -p /usr/local && (cd /usr/local && tar -xzf /tmp/go.tar.gz)
ENV PATH="$GOROOT/bin:$PATH"

# Install Docker
COPY superchain/gpg/docker.asc /tmp/docker.asc
RUN apt-key add /tmp/docker.asc && rm /tmp/docker.asc                                                                   \
  && echo "deb https://download.docker.com/linux/debian buster stable" > /etc/apt/sources.list.d/docker.list            \
  && apt-get update                                                                                                     \
  && apt-get -y install docker-ce docker-ce-cli containerd.io                                                           \
  && rm -rf /var/lib/apt/lists/*
VOLUME /var/lib/docker

# Install GitHub CLI
RUN curl -SsL "https://github.com/cli/cli/releases/download/v${GITHUB_CLI_VERSION}/gh_${GITHUB_CLI_VERSION}_linux_${TARGETPLATFORM#linux/}.deb"\
      -o /tmp/gh.deb                                                                                                    \
  && apt-get update                                                                                                     \
  && apt-get -y install /tmp/gh.deb                                                                                     \
  && rm /tmp/gh.deb                                                                                                     \
  && rm -rf /var/lib/apt/lists/*

# Install Node 10+ (configurable with '--build-arg NODE_MAJOR_VERSION=xxx') and yarn
# (Put this as late as possible in the Dockerfile so we get to reuse the layer cache
# for most of the multiple builds).
ARG NODE_MAJOR_VERSION=12
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

# Add the source used to build this Docker image (to facilitate re-builds, forensics)
COPY superchain /docker-source

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

CMD ["/bin/bash"]

########################################################################################################################
# Running tests now
########################################################################################################################
FROM superchain as test
COPY . /tmp/source
RUN cd /tmp/source && yarn install --frozen-lockfile && yarn build && yarn test
