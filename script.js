// Tabs
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Geolocation Logic
const latSpan = document.getElementById("latitude");
const lonSpan = document.getElementById("longitude");
const accSpan = document.getElementById("accuracy");

function updateDisplay(lat, lon, acc = 15) {
  latSpan.textContent = lat.toFixed(5);
  lonSpan.textContent = lon.toFixed(5);
  accSpan.textContent = acc;
  console.log(`✅ Mocked Location -> Lat: ${lat}, Lon: ${lon}, Accuracy: ${acc}m`);
}

// Preset Buttons
document.querySelectorAll(".buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    const lat = parseFloat(btn.dataset.lat);
    const lon = parseFloat(btn.dataset.lon);
    mockLocation(lat, lon);
  });
});

// Manual Input
document.getElementById("manual-btn").addEventListener("click", () => {
  const lat = parseFloat(document.getElementById("manual-latitude").value);
  const lon = parseFloat(document.getElementById("manual-longitude").value);
  if (isNaN(lat) || isNaN(lon)) return alert("⚠️ Enter valid coordinates!");
  mockLocation(lat, lon);
});

// Override getCurrentPosition
document.getElementById("override-btn").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition = (success) => {
    success({ coords: { latitude: 37.7749, longitude: -122.4194, accuracy: 10 } });
  };
  alert("✅ getCurrentPosition overridden (San Francisco)");
});

// Simulate watchPosition
document.getElementById("watch-btn").addEventListener("click", () => {
  let lat = 37.7749, lon = -122.4194;
  alert("📡 Simulating continuous updates...");
  setInterval(() => {
    lat += (Math.random() - 0.5) * 0.001;
    lon += (Math.random() - 0.5) * 0.001;
    updateDisplay(lat, lon);
  }, 2000);
});

// Helper
function mockLocation(lat, lon) {
  updateDisplay(lat, lon);
  navigator.geolocation.getCurrentPosition = (success) => {
    success({ coords: { latitude: lat, longitude: lon, accuracy: 15 } });
  };
}

// Copy Console Code
document.getElementById("copy-btn").addEventListener("click", () => {
  const code = document.getElementById("console-code").innerText;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById("copy-btn");
    btn.textContent = "✅ Copied!";
    setTimeout(() => (btn.textContent = "📋 Copy Code"), 1500);
  });
});
