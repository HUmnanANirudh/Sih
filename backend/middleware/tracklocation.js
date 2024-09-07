const axios = require('axios');

async function trackLocation(req, res, next) {
  let userLocation = {};

  if (req.body.coords) {
    // Use geolocation data from the front-end
    userLocation = {
      latitude: req.body.coords.latitude,
      longitude: req.body.coords.longitude,
    };
  } else {
    // Fallback: Use IP address to determine location
    try {
      const response = await axios.get(`https://ipapi.co/${req.ip}/json/`);
      userLocation = {
        city: response.data.city,
        region: response.data.region,
        country: response.data.country_name,
        latitude: response.data.latitude,
        longitude: response.data.longitude,
      };
    } catch (err) {
      console.error('Error fetching IP location:', err);
    }
  }

  req.userLocation = userLocation;  // Store location in request object
  next();
}

module.exports = trackLocation;
