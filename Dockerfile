# build app
FROM docker.io/node AS builder

RUN apt update
RUN apt install git

COPY . /app
WORKDIR /app

RUN npm install
RUN git clone https://github.com/binbashbanana/gfiles
RUN cd node_modules/ultraviolet-static/public

# build final
FROM gcr.io/distroless/nodejs:16

EXPOSE 8080/tcp
EXPOSE 5000/tcp

COPY --from=builder /app /

CMD ["src/index.js"]
