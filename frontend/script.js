const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found. Please enter a valid city name.");
      return;
    }

    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `🌡 Temperature: ${data.main.temp.toFixed(1)}°C`;
    document.getElementById("description").textContent = `☁️ Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `💨 Wind: ${data.wind.speed} m/s`;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById("result").classList.remove("hidden");
  } catch (error) {
    alert("An error occurred. Please try again later.");
    console.error(error);
  }
});
