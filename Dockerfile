FROM node:10-slim

# Create app directory
WORKDIR /usr/node/qfedu-wechat

# Install nodemon to implement hot-pulgin
RUN npm install -g nodemon

# Install app dependencies
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
# CMD ["node", "server.js"]
CMD ["nodemon", "server.js"]