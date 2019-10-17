FROM amazonlinux:2

# Install deltarpm as it can speed up the upgrade processes
RUN yum -y install deltarpm

# Install .NET Core, mono & PowerShell
ENV DOTNET_CLI_TELEMETRY_OPTOUT=true                                                                                    \
    DOTNET_RUNNING_IN_CONTAINER=true                                                                                    \
    DOTNET_USE_POLLING_FILE_WATCHER=true                                                                                \
    NUGET_XMLDOC_MODE=skip
COPY gpg/mono.asc /tmp/mono.asc
RUN rpm --import "https://packages.microsoft.com/keys/microsoft.asc"                                                    \
  && rpm -Uvh "https://packages.microsoft.com/config/rhel/7/packages-microsoft-prod.rpm"                                \
  && rpm --import /tmp/mono.asc && rm -f /tmp/mono.asc                                                                  \
  && curl -sSL "https://download.mono-project.com/repo/centos6-stable.repo"                                             \
      | tee /etc/yum.repos.d/mono-centos6-stable.repo                                                                   \
  && yum -y install dotnet-sdk-3.0 dotnet-sdk-2.2 mono-devel powershell                                                 \
  && yum clean all && rm -rf /var/cache/yum                                                                             \
  && dotnet help

# Install Python 3
RUN yum -y install python3 python3-pip                                                                                  \
  && python3 -m pip install --upgrade pip setuptools wheel twine                                                        \
  && yum clean all && rm -rf /var/cache/yum

# Install Ruby 2.4+
ENV GEM_HOME /usr/local/bundle
RUN amazon-linux-extras install ruby2.4                                                                                 \
  && yum -y install gcc make ruby-devel rubygem-rdoc system-rpm-config                                                  \
  && yum clean all && rm -rf /var/cache/yum                                                                             \
  && echo 'install: --no-document' > /usr/local/etc/gemrc                                                               \
  && echo 'update: --no-document' >> /usr/local/etc/gemrc                                                               \
  && mkdir -p "$GEM_HOME"                                                                                               \
  && gem install 'bundler:~>1.17.2' 'bundler:~>2.0.2'
ENV BUNDLE_SILENCE_ROOT_WARNING=1                                                                                       \
	  PATH="$GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH"

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
RUN yum -y install awscli git gzip openssl rsync tar unzip which zip                                                    \
  && yum clean all && rm -rf /var/cache/yum

# Install Node 8+
RUN curl -sL https://rpm.nodesource.com/setup_10.x | bash -                                                             \
  && yum -y install nodejs                                                                                              \
  && yum clean all && rm -rf /var/cache/yum                                                                             \
  && npm set unsafe-perm true

# Install Yarn
RUN curl -sSL https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo                                     \
  && yum -y install yarn                                                                                                \
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
      org.opencontainers.image.description="An image to build cross-language artifacts with AWS jsii"                   \
      org.opencontainers.image.url="https://github.com/aws/jsii/tree/master/superchain"                                 \
      org.opencontainers.image.source="https://github.com/aws/jsii.git"                                                 \
      org.opencontainers.image.revision=$COMMIT_ID

# Upgrade all packages that weren't up-to-date just yet (last so it risks invalidating cache less)
RUN yum -y upgrade                                                                                                      \
  && yum clean all && rm -rf /var/cache/yum

CMD ["/bin/bash"]
