# syntax=docker/dockerfile:1

FROM golang:1.16-alpine
RUN apk add build-base
WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

RUN go build -o /restaurant-backend

EXPOSE 8080

CMD [ "/restaurant-backend" ]
