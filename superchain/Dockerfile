FROM public.ecr.aws/amazonlinux/amazonlinux:2

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
    GOROOT="/usr/local/go"

# Install deltarpm as it can speed up the upgrade processes, and tar as it's needed for installing Maven
# Also upgrading anything already installed, and adding some common dependencies for included tools
RUN yum -y upgrade                                                                                                      \
  && yum -y install deltarpm tar                                                                                        \
                    make system-rpm-config yum-utils                                                                    \
                    git gzip openssl rsync unzip which zip                                                              \
  && yum clean all && rm -rf /var/cache/yum

# Install .NET Core, mono & PowerShell
COPY gpg/mono.asc /tmp/mono.asc
RUN rpm --import "https://packages.microsoft.com/keys/microsoft.asc"                                                    \
  && rpm -Uvh "https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm"                              \
  && rpm --import /tmp/mono.asc && rm -f /tmp/mono.asc                                                                  \
  && curl -sSL "https://download.mono-project.com/repo/centos7-stable.repo"                                             \
      | tee /etc/yum.repos.d/mono-centos7-stable.repo                                                                   \
  && yum -y install dotnet-sdk-3.1 mono-devel powershell                                                                \
  && yum-config-manager --disable packages-microsoft-com-prod                                                           \
  && yum-config-manager --disable mono-centos7-stable                                                                   \
  && yum clean all && rm -rf /var/cache/yum

# Install Python 3
RUN yum -y install python3 python3-pip                                                                                  \
  && python3 -m pip install --no-input --upgrade pip                                                                    \
  && python3 -m pip install --no-input --upgrade awscli black setuptools twine wheel                                    \
  && rm -rf $(pip cache dir)                                                                                            \
  && yum clean all && rm -rf /var/cache/yum

# Install JDK8 (Corretto)
RUN amazon-linux-extras enable corretto8                                                                                \
  && yum -y install java-1.8.0-amazon-corretto-devel                                                                    \
  && yum clean all && rm -rf /var/cache/yum

# Install Maven
RUN curl -sL https://www.apache.org/dist/maven/maven-3/${M2_VERSION}/binaries/apache-maven-${M2_VERSION}-bin.tar.gz     \
         -o /tmp/apache-maven.tar.gz                                                                                    \
  && curl -sL https://www.apache.org/dist/maven/maven-3/${M2_VERSION}/binaries/apache-maven-${M2_VERSION}-bin.tar.gz.asc\
          -o /tmp/apache-maven.tar.gz.asc                                                                               \
  && mkdir -p /tmp/gpg-maven && chmod go-rwx /tmp/gpg-maven                                                             \
  && curl -sL https://www.apache.org/dist/maven/KEYS | gpg --homedir /tmp/gpg-maven --import                            \
  && gpg --homedir /tmp/gpg-maven --verify /tmp/apache-maven.tar.gz.asc /tmp/apache-maven.tar.gz                        \
  && mkdir -p /usr/local && (cd /usr/local && tar xzf /tmp/apache-maven.tar.gz)                                         \
  && mv /usr/local/apache-maven-${M2_VERSION} /usr/local/apache-maven                                                   \
  && for BIN in $(find /usr/local/apache-maven/bin -type f -executable);                                                \
     do                                                                                                                 \
       ln -s $BIN /usr/local/bin/$(basename $BIN);                                                                      \
     done                                                                                                               \
  && rm -rf /tmp/apache-maven.tar.gz /tmp/apache-maven.tar.gz.asc /tmp/gpg-maven
COPY m2-settings.xml /root/.m2/settings.xml

# Install Go
RUN curl -sL https://golang.org/dl/go1.16.linux-amd64.tar.gz -o /tmp/go.tar.gz                                          \
  && mkdir -p /usr/local && (cd /usr/local && tar -xzf /tmp/go.tar.gz)
ENV PATH="$GOROOT/bin:$PATH"

# Install GCC
RUN yum -y install gcc

# Install Docker
RUN amazon-linux-extras install docker                                                                                  \
  && yum clean all && rm -rf /var/cache/yum
VOLUME /var/lib/docker

# Install Node using NVM (Node Version Manager) so we can have multiple Node versions installed and easily switch
# between them.
ENV NVM_DIR /usr/local/nvm

RUN mkdir -p $NVM_DIR && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash -                                   \
  && echo 'source "$NVM_DIR/nvm.sh"' >> $HOME/.bash_profile

# Because we wrote things to .bash_profile, make the default shell a login shell so it gets sourced.
# Also set BASH_ENV to make bash source this EVEN if it's not a login shell (later on when the container
# gets executed)
SHELL [ "/bin/bash", "--login", "-c" ]
ENV BASH_ENV /root/.bash_profile

# Source NVM into this shell and install Node 10 and 14. First installed version (10) becomes default.
RUN nvm install 10                                                                                                     \
  && nvm install 14                                                                                                    \
  && npm set unsafe-perm true

# Can't install Yarn using yum anymore now that we're using nvm, so install it using NPM
RUN nvm exec 10 npm install -g yarn                                                                                    \
  && nvm exec 14 npm install -g yarn

# Install some configuration
COPY ssh_config /root/.ssh/config
RUN chmod 600 /root/.ssh/config
COPY dockerd-entrypoint.sh /usr/local/bin/

# Add the source used to build this Docker image (to facilitate re-builds, forensics)
COPY . /docker-source

## Image Metadata
ARG BUILD_TIMESTAMP
ARG COMMIT_ID
LABEL org.opencontainers.image.created=${BUILD_TIMESTAMP}                                                               \
      org.opencontainers.image.title="jsii/superchain"                                                                  \
      org.opencontainers.image.description="An image to build cross-language artifacts with AWS jsii"                   \
      org.opencontainers.image.url="https://github.com/aws/jsii/tree/main/superchain"                                 \
      org.opencontainers.image.source="https://github.com/aws/jsii.git"                                                 \
      org.opencontainers.image.revision=$COMMIT_ID                                                                      \
      org.opencontainers.image.authors="Amazon Web Services (https://aws.amazon.com)"

CMD ["/bin/bash", "--login"]
