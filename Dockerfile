# Stage 1: Compile and Build Angular codebase
FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build



# Stage 2: Serve app using NGINX
FROM nginx:latest
COPY --from=build /usr/local/app/dist/case-study-productsup /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
