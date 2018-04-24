FROM amazonlinux

ADD etc/nodesource.gpg.key /etc

WORKDIR /tmp

RUN yum -y install gcc-c++ && \
    rpm --import /etc/nodesource.gpg.key && \
    curl -sL https://rpm.nodesource.com/setup_8.x | bash - && \
    yum install -y nodejs

WORKDIR /build
