FROM node:18-alpine3.16 as builder

ARG module
WORKDIR /root/etl-backend

COPY apps/$module .

RUN rm -rf node_modules && npm install && npm run build
 
FROM node:18-alpine3.16 as runner  

WORKDIR /root/etl-backend
ARG module

COPY --from=builder /root/etl-backend/build apps/$module/build
COPY --from=builder /root/etl-backend/node_modules apps/$module/node_modules
COPY --from=builder /root/etl-backend/package.json apps/$module/package.json

ENV module=$module

CMD node apps/$module/build/index.js

