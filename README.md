# AgriWeather Advisor - Deployment Guide

This document explains how to build, deploy, and test the AgriWeather Advisor web application using Docker and HAProxy load balancing.

## 1. Application Overview

AgriWeather Advisor is a simple web application that:

* Allows users to enter a location to see current weather information.
* Provides a basic crop tip based on temperature.
* Uses the OpenWeatherMap API to fetch live weather data.

## 2. Docker Hub Image

```
Docker Hub: https://hub.docker.com/r/<your-dockerhub-username>/agriweather
Image: <your-dockerhub-username>/agriweather:v1
```

## 3. Local Build & Test

Build and run the application locally:

```bash
docker build -t <your-dockerhub-username>/agriweather:v1 .
docker run -p 8080:80 <your-dockerhub-username>/agriweather:v1
```

Visit [http://localhost:8080](http://localhost:8080) to view the application.

## 4. Push Image to Docker Hub

```bash
docker login
docker push <your-dockerhub-username>/agriweather:v1
```

## 5. Deployment on Web01 & Web02

### SSH into Web01

```bash
ssh username@web01
```

Pull and run the container:

```bash
docker pull <your-dockerhub-username>/agriweather:v1
docker run -d --name agriweather --restart unless-stopped -p 8080:80 <your-dockerhub-username>/agriweather:v1
curl http://localhost:8080 # Verify it works
```

### SSH into Web02

```bash
ssh username@web02
```

Repeat the same steps as Web01:

```bash
docker pull <your-dockerhub-username>/agriweather:v1
docker run -d --name agriweather --restart unless-stopped -p 8080:80 <your-dockerhub-username>/agriweather:v1
curl http://localhost:8080
```

## 6. Configure HAProxy on Lb01

### SSH into Lb01

```bash
ssh username@lb01
```

Edit HAProxy config:

```bash
sudo nano /etc/haproxy/haproxy.cfg
```

Add the following snippet (update IPs for your Web01 & Web02):

```
frontend http_front
    bind *:80
    default_backend webapps

backend webapps
    balance roundrobin
    server web01 172.20.0.11:8080 check
    server web02 172.20.0.12:8080 check
```

Reload HAProxy:

```bash
docker exec -it lb-01 sh -c 'haproxy -sf $(pidof haproxy) -f /etc/haproxy/haproxy.cfg'
```

## 7. Test Load Balancing

From Lb01 or your local machine:

```bash
curl http://localhost
```

* Run multiple times; responses should alternate between Web01 and Web02.
* Or open `http://<Lb01-IP>` in a browser.

## 8. Testing Evidence

Include screenshots of:

* App running locally
* Docker image on Docker Hub
* Curl results from Web01 and Web02
* Curl or browser test from Lb01 showing round-robin

## 9. Optional Hardening

* Use environment variables for API keys:

```bash
docker run -d --name agriweather --env API_KEY=xxxx -p 8080:80 <your-dockerhub-username>/agriweather:v1
```

* Update `script.js` to read the key from a backend or config instead of hardcoding.

---

**End of README**
