FROM node:alpine AS builder

# Set working directory
WORKDIR '/dafis'
# Install require module
RUN apk update && apk add g++ make bash zlib-dev libpng-dev libtool automake autoconf nasm && rm -fr /var/cache/apk/*
# Copy NPM Package
COPY 'package.json' .
RUN npm install
COPY . .

RUN npm run production

FROM node:alpine

WORKDIR '/dafis-app'
COPY --from=builder /dafis/package.json /dafis-app/package.json
COPY --from=builder /dafis/dist /dafis-app/dist
COPY --from=builder /dafis/public /dafis-app/public
COPY --from=builder /dafis/node_modules /dafis-app/node_modules

# Run command
CMD ["node", "dist/app.js"]


FROM nginx
COPY --from=builder /dafis-app/dist /usr/share/nginx/html
