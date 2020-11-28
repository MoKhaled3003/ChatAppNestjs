# Pull node image from docker hub
FROM node:10-alpine

#making sure that container isn't running as root
RUN addgroup  nodejs && adduser   -S -s  /bin/bash -g  nodejs nodejs
RUN chown nodejs:nodejs  /var/
USER nodejs

# Set working directory
RUN mkdir -p /var/www/nest-chat-realtime
WORKDIR /var/www/nest-chat-realtime

# Copy existing application directory contents
COPY . /var/www/nest-chat-realtime
# install all dependencies
RUN npm cache clean --force
RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "start" ]