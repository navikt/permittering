FROM navikt/node-express:16

WORKDIR /app
COPY build/ build/
COPY server/ server/

WORKDIR /app/server
ENV NODE_ENV production

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
