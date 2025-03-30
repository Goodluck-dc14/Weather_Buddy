# Weather Buddy

A web application that provides a 5-day weather forecast for any city, built with Express.js and hosted across two servers with load balancing.

## Local Setup

1. Clone: `git clone <https://github.com/Goodluck-dc14/Weather_Buddy.git>`
2. Install: `npm install`
3. Set `.env`: `API_KEY=your_rapidapi_key`
4. Run: `npm run dev`

## Deployment

### Web Servers

- **web-01 (44.202.96.98)** and **web-02 (44.208.26.113)**:
  1. `scp weather_buddy.tar.gz ubuntu@<IP>:~`
  2. `tar -xzf weather_buddy.tar.gz && sudo mv Weather_Buddy /var/www/html/Weather_Buddy`
  3. `cd /var/www/html/Weather_Buddy && npm install`
  4. `sudo npm install -g pm2 && pm2 start index.js`
  5. Nginx: Configured with `proxy_pass http://localhost:3000`
  6. `sudo service nginx restart`

### Load Balancer

- `lb-01 (44.201.82.226)`: HAProxy with round-robin balancing.

## Notes

- Faced SSH access issues with web-02, resolved after retrying.
- Downgraded axios to ^0.27.2 for CommonJS compatibility.

## Credits

- [RapidAPI Weather](https://rapidapi.com/weatherapi/api/weatherapi-com)

## Live Demo

- **Domain**: [http://sheisgoodluck.tech/](http://sheisgoodluck.tech/)
  - Access the app via the load balancer at `http://sheisgoodluck.tech/weather?city=<city_name>` (e.g., `London`).
