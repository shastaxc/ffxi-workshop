##################
### build prod ###
##################
FROM openjdk:17-jdk-alpine as build-prod

# set working directory
WORKDIR /app

# add app
COPY . .

# generate build
RUN ./gradlew build && \
# Remove *-plain.jar
    rm -f build/libs/*-plain.jar


############
### prod ###
############
FROM openjdk:17-jdk-alpine as production

# set working directory
WORKDIR /app

# copy artifact build from the 'build environment'
COPY --from=build-prod /app/build/libs/*.jar app.jar

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

ENTRYPOINT ["java","-jar","./app.jar"]
