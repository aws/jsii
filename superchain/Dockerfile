FROM amazonlinux:2

# Install .NET Core, mono & PowerShell
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1                                                                                       \
    DOTNET_SKIP_FIRST_TIME_EXPERIENCE=1
COPY gpg/mono.asc /tmp/mono.asc
RUN rpm --import "https://packages.microsoft.com/keys/microsoft.asc"                                                    \
  && rpm -Uvh "https://packages.microsoft.com/config/rhel/7/packages-microsoft-prod.rpm"                                \
  && rpm --import /tmp/mono.asc && rm -f /tmp/mono.asc                                                                  \
  && curl "https://download.mono-project.com/repo/centos6-stable.repo" | tee /etc/yum.repos.d/mono-centos6-stable.repo  \
  && yum -y install dotnet-sdk-2.2 mono-devel powershell                                                                \
  && yum clean all && rm -rf /var/cache/yum

# Install Python 3
RUN yum -y install python3 python3-pip                                                                                  \
  && python3 -m pip install --upgrade pip setuptools wheel twine                                                        \
  && yum clean all && rm -rf /var/cache/yum

# Install Ruby 2.4+
RUN amazon-linux-extras install ruby2.4                                                                                 \
  && yum -y install gcc make ruby-devel rubygem-rdoc system-rpm-config                                                  \
  && yum clean all && rm -rf /var/cache/yum                                                                             \
  && echo 'install: --no-document' > ~/.gemrc                                                                           \
  && gem install 'bundler:~>1.17.2' 'bundler:~>2.0.2'

# Install JDK8 (Corretto)
RUN amazon-linux-extras install corretto8                                                                               \
  && yum -y install maven                                                                                               \
  && yum clean all && rm -rf /var/cache/yum
COPY m2-settings.xml /root/.m2/settings.xml

# Install Docker
RUN amazon-linux-extras install docker                                                                                  \
  && yum clean all && rm -rf /var/cache/yum
VOLUME /var/lib/docker

# Install shared dependencies
RUN yum -y install awscli git gzip openssl rsync tar unzip zip                                                          \
  && yum clean all && rm -rf /var/cache/yum

# Install NVM and Node 8+
ARG NODE_VERSION=8.16.0
ARG NPM_VERSION=6.8.0
ENV NVM_DIR=/usr/local/nvm
RUN curl -sSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh -o /tmp/install-nvm.sh                    \
  && echo "ef7ad1db40c92f348c0461f24983b71ba0ea7d45d4007a36e484270fa7f81fcf /tmp/install-nvm.sh" | sha256sum -c         \
  && mkdir -p ${NVM_DIR}                                                                                                \
  && bash /tmp/install-nvm.sh                                                                                           \
  && rm /tmp/install-nvm.sh                                                                                             \
  && . ${NVM_DIR}/nvm.sh                                                                                                \
  && nvm install ${NODE_VERSION}                                                                                        \
  && nvm alias default ${NODE_VERSION}                                                                                  \
  && nvm use default                                                                                                    \
  && npm -g install npm@^${NPM_VERSION}                                                                                 \
  && npm set unsafe-perm true
ENV NODE_PATH=${NVM_DIR}/versions/node/v${NODE_VERSION}/lib/node_modules                                                \
    PATH=${PATH}:${NVM_DIR}/versions/node/v${NODE_VERSION}/bin

# Upgrade all packages that weren't up-to-date just yet
RUN yum -y upgrade                                                                                                      \
  && yum clean all && rm -rf /var/cache/yum

# Install some configuration
COPY ssh_config /root/.ssh/config
COPY dockerd-entrypoint.sh /usr/local/bin/
ENV CHARSET=UTF-8                                                                                                       \
    LC_ALL=C.UTF-8

## Image Metadata
ARG BUILD_TIMESTAMP
ARG COMMIT_ID
LABEL org.opencontainers.image.created=${BUILD_TIMESTAMP}                                                               \
      org.opencontainers.image.title="jsii/superchain"                                                                  \
      org.opencontainers.image.description="An image to build cross-language artifacts with AWS JSII"                   \
      org.opencontainers.image.url="https://github.com/aws/jsii/tree/master/superchain"                                 \
      org.opencontainers.image.source="https://github.com/aws/jsii.git"                                                 \
      org.opencontainers.image.revision=$COMMIT_ID

CMD ["/bin/bash"]
