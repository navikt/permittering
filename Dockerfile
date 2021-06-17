FROM navikt/node-express:14

COPY build/ build/
COPY src/server/ src/server/
COPY src/paths.json src/paths.json

WORKDIR /app/src/server
ENV NODE_ENV production
RUN yarn install --frozen-lockfile

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
