#############
###  dev  ###
#############
FROM node:16.15.0-alpine as development

# set working directory
WORKDIR /app

# to use packages in CLI without global install
ENV PATH $PATH:/app/node_modules/.bin

# Create /tmp directory for use in executing scripts
RUN mkdir -p /tmp

COPY . .

CMD ["/bin/sh", "-c", "npm run start"]

##################
### build prod ###
##################
FROM node:16.15.0-alpine as build-prod

# set working directory
WORKDIR /app

# to use packages in CLI without global install
ENV PATH $PATH:/app/node_modules/.bin

# add app
COPY . .

# install and cache app dependencies
RUN npm install

# generate build
RUN npm run build

############
### prod ###
############
FROM nginx:1.21.6-alpine as production

# copy artifact build from the 'build environment'
COPY --from=build-prod /app/dist/ffxi-workshop /usr/share/nginx/html

# Run nginx server
CMD ["/bin/sh", "-c", "nginx -g \"daemon off;\""]
