# AgriWeather Advisor 

AgriWeather Advisor is a web-based tool designed to assist farmers by providing:

Real-time weather updates for any location.

Actionable crop advice based on current temperature.

User-friendly interface accessible via browser on desktop or mobile.

This app bridges the gap between raw weather data and practical farming decisions, helping farmers reduce risks and improve productivity.
APP LINK  https://0allan1.github.io/AgriWeather-Advisor/

##  Application Overview

AgriWeather Advisor is a simple web application that:

* Allows users to enter a location to see current weather information.
* Provides a basic crop tip based on temperature.
* Uses the OpenWeatherMap API to fetch live weather data.


##  Docker Hub Image


Docker Hub repo: https://hub.docker.com/r/0allan1/agriweather
Image: 0allan1/agriweather:v1


##  Local Build & Test

Build and run the application locally:

```bash
docker build -t 0allan1/agriweather:v1 .
docker run -p 8080:80 0allan1/agriweather:v1

```
Visit [http://localhost:8080](http://localhost:8080) to view the application.


##  Configure HAProxy on Lb01


Edit HAProxy config:

bash
sudo nano /etc/haproxy/haproxy.cfg


Add the following snippet (update IPs for Web01 & Web02):


frontend http_front
    bind *:80
    default_backend webapps

backend webapps
    balance roundrobin
    server web01 172.20.0.11:8080 check
    server web02 172.20.0.12:8080 check


Reload HAProxy:

bash
docker exec -it lb-01 sh -c 'haproxy -sf $(pidof haproxy) -f /etc/haproxy/haproxy.cfg'


##  Test Load Balancing

From Lb01 or your local machine:



* Run multiple times; responses should alternate between Web01 and Web02.
* Or open `http://<Lb01-IP>` in a browser.

## 8. Testing Evidence

Include screenshots of:

* App running locally
* Docker image on Docker Hub
* Curl results from Web01 and Web02
* Curl or browser test from Lb01 showing round-robin



**End of README**
