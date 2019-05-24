FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR .
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 4000
CMD [ “npm”, “start” ]