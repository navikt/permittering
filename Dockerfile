FROM gcr.io/distroless/nodejs20-debian11

WORKDIR /app
COPY build/ build/
COPY server/ server/

WORKDIR /app/server
ENV NODE_ENV production

EXPOSE 3000
CMD ["server.js"]
