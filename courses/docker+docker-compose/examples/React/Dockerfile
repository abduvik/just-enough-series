FROM node:16 as Build
RUN apt-get update
WORKDIR /usr/src/
COPY hello-react .
ENV name Building Nations
RUN npm install
RUN npm run build

FROM nginx
COPY --from=Build /usr/src/build /usr/share/nginx/html
EXPOSE 80