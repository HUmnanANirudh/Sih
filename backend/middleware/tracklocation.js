const axios = require('axios');

async function trackLocation(req, res, next) {
  let userLocation = {};

  if (req.body.coords) {
    userLocation = {
      latitude: req.body.coords.latitude,
      longitude: req.body.coords.longitude,
    };
  } else {
    
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

  req.userLocation = userLocation; 
  next();
}

module.exports = trackLocation;
