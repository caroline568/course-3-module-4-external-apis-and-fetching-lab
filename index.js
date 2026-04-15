const input = document.getElementById("stateInput");
const button = document.getElementById("getWeatherBtn");
const alertsDiv = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

// REQUIRED FUNCTION
async function fetchWeatherData(state) {
  const response = await fetch(
    `https://api.weather.gov/alerts/active?area=${state}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return response.json();
}

// REQUIRED FUNCTION
function displayWeather(data) {
  alertsDiv.innerHTML = "";

  const alerts = data.features;

  alertsDiv.textContent = `Weather Alerts: ${alerts.length}`;

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    alertsDiv.appendChild(p);
  });
}

// REQUIRED FUNCTION
function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

// BUTTON EVENT
button.addEventListener("click", async () => {
  const state = input.value.trim().toUpperCase();

  try {
    const data = await fetchWeatherData(state);

    displayWeather(data);

    //  clear error
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

  } catch (error) {
    displayError(error.message);
  }

  // clear input ALWAYS
  input.value = "";
});

module.exports = {
  fetchWeatherData,
  displayWeather,
  displayError
};