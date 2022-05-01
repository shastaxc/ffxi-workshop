#############
###  dev  ###
#############
FROM openjdk:17-jdk-alpine as development

# set working directory
WORKDIR /app

COPY . .

# generate build
RUN ./gradlew build -x test && \
# Remove *-plain.jar
    rm -f build/libs/*-plain.jar && \
    cp build/libs/*.jar app.jar

ENTRYPOINT ["java","-jar","./app.jar"]


##################
### build prod ###
##################
FROM openjdk:17-jdk-alpine as build-prod

# set working directory
WORKDIR /app

# add app
COPY src/ .
COPY gradle/ .
COPY build.gradle .
COPY gradlew .
COPY gradlew.bat .
COPY settings.gradle .

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
