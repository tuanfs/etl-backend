FROM node:alpine as builder

WORKDIR /root/etl-backend

COPY . .

RUN npm install
RUN npm run build

FROM node:alpine as runner

COPY --from=builder /root/etl-backend/build /root/etl-backend/build
COPY --from=builder /root/etl-backend/node_modules /root/etl-backend/node_modules
COPY --from=builder /root/etl-backend/package.json /root/etl-backend/package.json
COPY --from=builder /root/etl-backend/.env /root/etl-backend/.env



ENV module=etl-backend

CMD node build/index.js

