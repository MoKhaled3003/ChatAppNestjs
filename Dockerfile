# Pull node image from docker hub
FROM node:10-alpine

# Set working directory
RUN mkdir -p /var/www/nest-chat-realtime
WORKDIR /var/www/nest-chat-realtime

# Copy existing application directory contents
COPY . /var/www/nest-chat-realtime
# install and cache app dependencies
COPY package.json /var/www/nest-chat-realtime/package.json
COPY package-lock.json /var/www/nest-chat-realtime/package-lock.json

# clear application caching
RUN npm cache clean --force
# install all dependencies
RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "start" ]