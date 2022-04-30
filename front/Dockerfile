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

EXPOSE 4200

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
RUN npm run build:prod

############
### prod ###
############
FROM nginx:1.21.6-alpine as production

# copy artifact build from the 'build environment'
COPY --from=build-prod /app/dist /usr/share/nginx/html

# Change config to serve on port 4300
RUN sed -i 's/80;/4200;/g' /etc/nginx/conf.d/default.conf &&\
    sed -i '17s/.*/#&/' /etc/nginx/conf.d/default.conf &&\
    sed -i '18s/.*/#&/' /etc/nginx/conf.d/default.conf &&\
    sed -i '19s/.*/#&/' /etc/nginx/conf.d/default.conf &&\
    sed -i '20s/.*/#&/' /etc/nginx/conf.d/default.conf &&\
    sed -i '10s/^.*$/try_files $uri $uri\/ \/index.html;/' /etc/nginx/conf.d/default.conf

EXPOSE 4200

# Run nginx server
CMD ["/bin/sh", "-c", "nginx -g \"daemon off;\""]
