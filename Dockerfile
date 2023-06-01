
# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:18.4.0 AS build
# Set the working directory to /app inside the container
WORKDIR /amm-fe
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build

FROM nginx:latest AS prod

COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /amm-fe/build /usr/share/nginx/html
EXPOSE 3000
# run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
#RUN npm install -g serve
## ==== RUN =======
## Set the env to "production"
#ENV NODE_ENV production
## Expose the port on which the app will be running (3000 is the default that `serve` uses)
#EXPOSE 3000
## Start the app
#CMD [ "serve", "-p", "3000", "build" ]
