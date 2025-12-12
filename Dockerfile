FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim
ENV NPM_CONFIG_CACHE=/tmp
ENV NODE_ENV=production

WORKDIR /app
COPY build/ build/
COPY server/ server/

WORKDIR /app/server

EXPOSE 3000
CMD ["server.js"]
