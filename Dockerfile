FROM mhart/alpine-node:14
WORKDIR '/app'
COPY package.json .
RUN node --version
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm","start"]
