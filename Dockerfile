FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app
COPY build/ build/
COPY server/ server/

WORKDIR /app/server
ENV NODE_ENV production

EXPOSE 3000
CMD ["server.js"]
