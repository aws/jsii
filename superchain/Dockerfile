FROM amazonlinux:2

# Install shared dependencies
RUN yum -y upgrade                                                                                                      \
  && yum -y install awscli git gzip rsync tar unzip zip                                                                 \
  && yum clean all && rm -rf /var/cache/yum

###
# We'll be trying to install stuff slowest to fastest, as a courtesy to people who'll have to build & re-build this.
###

# Install NVM and Node 8+
RUN curl -sSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh -o /tmp/install-nvm.sh                    \
  && echo "ef7ad1db40c92f348c0461f24983b71ba0ea7d45d4007a36e484270fa7f81fcf /tmp/install-nvm.sh" | sha256sum -c         \
  && touch ~/.bashrc                                                                                                    \
  && bash /tmp/install-nvm.sh                                                                                           \
  && rm /tmp/install-nvm.sh                                                                                             \
  && . ~/.nvm/nvm.sh                                                                                                    \
  && nvm install 8                                                                                                      \
  && npm -g install npm@^6.8.0                                                                                          \
  && npm set unsafe-perm true

# Install .NET Core
RUN rpm -Uvh https://packages.microsoft.com/config/rhel/7/packages-microsoft-prod.rpm                                   \
  && yum -y install dotnet-sdk-2.2                                                                                      \
  && yum clean all && rm -rf /var/cache/yum                                                                             \
  && echo 'DOTNET_CLI_TELEMETRY_OPTOUT=1' >> ~/.bashrc

# Install Powershell
RUN yum install -y powershell                                                                                           \
  && yum clean all && rm -rf /var/cache/yum

# Install Python 3
RUN yum -y install python3 python3-pip python3-wheel                                                                    \
  && python3 -m pip install --upgrade pip wheel                                                                         \
  && yum clean all && rm -rf /var/cache/yum

# Install Ruby 2.4+
RUN amazon-linux-extras install ruby2.4                                                                                 \
  && yum -y install gcc make ruby-devel system-rpm-config                                                               \
  && yum clean all && rm -rf /var/cache/yum                                                                             \
  && echo 'install: --no-document' > ~/.gemrc                                                                           \
  && gem install bundler

# Install JDK8 (Corretto)
RUN amazon-linux-extras install corretto8                                                                               \
  && yum -y install maven                                                                                               \
  && yum clean all && rm -rf /var/cache/yum
COPY m2-settings.xml /root/.m2/settings.xml

# Install Docker
RUN amazon-linux-extras install docker                                                                                  \
  && yum clean all && rm -rf /var/cache/yum
VOLUME /var/lib/docker

# Install some configuration
COPY ssh_config /root/.ssh/config
COPY dockerd-entrypoint.sh /usr/local/bin/

## Image Metadata
ARG BUILD_TIMESTAMP
ARG COMMIT_ID
LABEL org.opencontainers.image.created=${BUILD_TIMESTAMP}
LABEL org.opencontainers.image.title="jsii/superchain"
LABEL org.opencontainers.image.description="An image to build cross-language artifacts with AWS JSII"
LABEL org.opencontainers.image.url="https://github.com/aws/jsii/tree/master/superchain"
LABEL org.opencontainers.image.source="https://github.com/aws/jsii.git"
LABEL org.opencontainers.image.revision=$COMMIT_ID

CMD [ "/bin/bash" ]
