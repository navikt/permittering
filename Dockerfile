FROM navikt/node-express:12.2.0
WORKDIR /app
RUN yarn add passport openid-client express-http-proxy express-session mustache-express jsdom promise redis connect-redis request

COPY build/ build/
COPY src/server/ src/server/
COPY src/paths.json src/paths.json
COPY start.sh ./

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
