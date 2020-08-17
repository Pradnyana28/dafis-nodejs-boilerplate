FROM node:alpine AS builder

# Set working directory
WORKDIR '/app'
# Install require module
RUN apk --no-cache update && apk --no-cache add g++ make bash zlib-dev libpng-dev libtool automake autoconf nasm && rm -fr /var/cache/apk/*
# Copy NPM Package
COPY 'package.json' .
# Install PM2
RUN npm install pm2 -g
# Install dependencies
RUN npm install --only=prod
# Run test
RUN npm run test
# Run production comment
RUN npm run production
# Copy project files
COPY public .
COPY dist .
# Run command
CMD ["npm", "run", "up"]

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
