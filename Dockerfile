FROM node:22-alpine
WORKDIR /app
COPY . .
ENV PORT=3000 DATA_FILE=/data/state.json
EXPOSE 3000
VOLUME /data
CMD ["node", "server.js"]
