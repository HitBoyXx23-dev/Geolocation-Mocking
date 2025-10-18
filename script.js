const latSpan = document.getElementById("latitude");
const lonSpan = document.getElementById("longitude");
const accSpan = document.getElementById("accuracy");

function updateDisplay(lat, lon, acc = 15) {
  latSpan.textContent = lat.toFixed(5);
  lonSpan.textContent = lon.toFixed(5);
  accSpan.textContent = acc;
  console.log(`✅ Mocked Location -> Latitude: ${lat}, Longitude: ${lon}, Accuracy: ${acc}m`);
}

// --- Preset Buttons ---
document.querySelectorAll(".buttons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lat = parseFloat(btn.dataset.lat);
    const lon = parseFloat(btn.dataset.lon);
    mockLocation(lat, lon);
  });
});

// --- Manual Input ---
document.getElementById("manual-btn").addEventListener("click", () => {
  const lat = parseFloat(document.getElementById("manual-latitude").value);
  const lon = parseFloat(document.getElementById("manual-longitude").value);
  if (isNaN(lat) || isNaN(lon)) return alert("⚠️ Please enter valid coordinates!");
  mockLocation(lat, lon);
});

// --- getCurrentPosition Override ---
document.getElementById("override-btn").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition = function (success) {
    success({
      coords: { latitude: 37.7749, longitude: -122.4194, accuracy: 10 },
    });
  };
  alert("✅ getCurrentPosition() overridden globally (San Francisco).");
});

// --- watchPosition Simulation ---
document.getElementById("watch-btn").addEventListener("click", () => {
  let lat = 37.7749, lon = -122.4194;
  const interval = setInterval(() => {
    lat += (Math.random() - 0.5) * 0.001;
    lon += (Math.random() - 0.5) * 0.001;
    updateDisplay(lat, lon);
  }, 2000);
  alert("📡 Simulating continuous position updates...");
});

// --- Mock Helper ---
function mockLocation(lat, lon) {
  updateDisplay(lat, lon);
  navigator.geolocation.getCurrentPosition = (success) => {
    success({ coords: { latitude: lat, longitude: lon, accuracy: 15 } });
  };
}

// --- Copy Console Code ---
const copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click", () => {
  const code = document.getElementById("console-code").innerText;
  navigator.clipboard.writeText(code).then(() => {
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => (copyBtn.textContent = "📋 Copy Code"), 1500);
  });
});
