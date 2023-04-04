FROM navikt/node-express:16

WORKDIR /app
COPY build/ build/
COPY src/server/ src/server/

WORKDIR /app/src/server
ENV NODE_ENV production

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
