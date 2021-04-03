FROM nvcr.io/nvidia/pytorch:19.12-py3

RUN curl -fsSL https://code-server.dev/install.sh | sh

WORKDIR /root
EXPOSE 8080

ENTRYPOINT [ "code-server" ]
CMD [ "--bind-addr", "0.0.0.0:8081" ]