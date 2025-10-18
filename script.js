// Mocked coordinates for each location
const locations = {
  japan: { lat: 35.682839, lon: 139.759455, accuracy: 10 },  // Tokyo
  canada: { lat: 43.653225, lon: -79.383186, accuracy: 15 },  // Toronto
  germany: { lat: 52.520008, lon: 13.404954, accuracy: 20 },  // Berlin
  singapore: { lat: 1.352083, lon: 103.819839, accuracy: 25 },  // Singapore
  lasvegas: { lat: 36.1699, lon: -115.1398, accuracy: 30 },  // Las Vegas
};

// Update the geolocation result in the HTML
function updateGeolocationOutput(lat, lon, accuracy) {
  document.getElementById('latitude').textContent = lat;
  document.getElementById('longitude').textContent = lon;
  document.getElementById('accuracy').textContent = accuracy;
}

// Override the geolocation API to return mocked data
function overrideGeolocation(location) {
  navigator.geolocation.getCurrentPosition = function(success, error) {
    success({
      coords: {
        latitude: location.lat,
        longitude: location.lon,
        accuracy: location.accuracy,
      }
    });
  };
  updateGeolocationOutput(location.lat, location.lon, location.accuracy);
}

// Event listeners for each button
document.getElementById('japan-btn').addEventListener('click', () => {
  overrideGeolocation(locations.japan);
});

document.getElementById('canada-btn').addEventListener('click', () => {
  overrideGeolocation(locations.canada);
});

document.getElementById('germany-btn').addEventListener('click', () => {
  overrideGeolocation(locations.germany);
});

document.getElementById('singapore-btn').addEventListener('click', () => {
  overrideGeolocation(locations.singapore);
});

document.getElementById('lasvegas-btn').addEventListener('click', () => {
  overrideGeolocation(locations.lasvegas);
});

// Override the `getCurrentPosition` globally
document.getElementById('override-btn').addEventListener('click', () => {
  const location = locations.japan;  // You can choose any location here
  overrideGeolocation(location);
});

// Override the `watchPosition` for continuous updates
document.getElementById('watch-btn').addEventListener('click', () => {
  navigator.geolocation.watchPosition = function(success, error) {
    let index = 0;
    const locationsList = [locations.japan, locations.canada, locations.germany, locations.singapore, locations.lasvegas];
    setInterval(() => {
      const location = locationsList[index];
      success({
        coords: {
          latitude: location.lat,
          longitude: location.lon,
          accuracy: location.accuracy,
        }
      });
      index = (index + 1) % locationsList.length;
    }, 3000);  // Updates every 3 seconds
  };

  // Start watching position
  navigator.geolocation.watchPosition(function(position) {
    updateGeolocationOutput(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
  });
});

// Handle the manual input for custom latitude and longitude
document.getElementById('manual-btn').addEventListener('click', () => {
  const lat = parseFloat(document.getElementById('manual-latitude').value);
  const lon = parseFloat(document.getElementById('manual-longitude').value);
  
  if (isNaN(lat) || isNaN(lon)) {
    alert('Please enter valid latitude and longitude values.');
    return;
  }

  // Simulate the custom geolocation
  const customLocation = { lat, lon, accuracy: 20 };
  overrideGeolocation(customLocation);
});
