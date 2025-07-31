# lightweight web server
FROM nginx:alpine

# working directory
WORKDIR /usr/share/nginx/html

# default nginx page
RUN rm -rf ./*

# Copy of files into the container
COPY index.html .
COPY style.css .
COPY script.js .

# Expose port 8080 
EXPOSE 8080

# Run nginx on port 8080
CMD ["nginx", "-g", "daemon off;"]
