FROM ghcr.io/linuxserver/openssh-server
# FROM ghcr.io/maastrichtu-ids/ubuntu:latest

RUN sed -i 's@#PermitTunnel no@PermitTunnel yes@' /etc/ssh/sshd_config
RUN sed -i 's@AllowTcpForwarding no@AllowTcpForwarding yes@' /etc/ssh/sshd_config


# ENV TZ=Europe/Amsterdam
# ENV DEBIAN_FRONTEND=noninteractive

# RUN apt-get update && \
#     apt-get install -y openssh-server

# # RUN useradd testuser

# RUN service ssh restart

# EXPOSE 22

# CMD ["/usr/sbin/sshd","-D"]

# oc new-build --name ubuntu-ssh --binary
# oc start-build ubuntu-ssh --from-dir=. --follow --wait