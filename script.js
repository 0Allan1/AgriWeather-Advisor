async function getWeather() {
  const location = document.getElementById('locationInput').value;
  const apiKey = 'e708582412f59aaa9304fce65b49647c';  // API

  const weatherDiv = document.getElementById('weatherInfo');
  const tipDiv = document.getElementById('cropTip');
  const errorDiv = document.getElementById('error');

  weatherDiv.innerHTML = '';
  tipDiv.innerHTML = '';
  errorDiv.innerHTML = '';

  if (!location) {
    errorDiv.textContent = 'Please enter a location.';
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      errorDiv.textContent = data.message;
      return;
    }

    const temp = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;

    weatherDiv.innerHTML = `
      <h2>Weather in ${location}</h2>
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Condition:</strong> ${description}</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
    `;

    // Simple crop tip logic
    let tip = '';
    if (temp < 15) {
      tip = '🌱 Consider planting cold-resistant crops like cabbage or onions.';
    } else if (temp >= 15 && temp <= 25) {
      tip = '🌾 Good temperature for maize or beans. Ensure regular watering.';
    } else {
      tip = '🌵 High heat! Use mulching and water in the evening.';
    }

    tipDiv.innerHTML = `<h3>Crop Tip:</h3><p>${tip}</p>`;
  } catch (err) {
    errorDiv.textContent = 'Something went wrong. Please try again.';
  }
}
