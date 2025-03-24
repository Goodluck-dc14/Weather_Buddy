async function getWeather() {
  const city = document.getElementById("city").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(`http://localhost:3000/weather?city=${city}`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    const current = data.current;
    const forecast = data.forecast.forecastday;
    let html = `<h2>${data.location.name}</h2>`;
    html += `<p>Now: ${current.temp_c}°C, ${current.condition.text}</p>`;
    html += `<h3>5-Day Forecast:</h3>`;
    forecast.forEach((day) => {
      html += `<p>${day.date}: ${day.day.avgtemp_c}°C, ${day.day.condition.text}</p>`;
    });
    resultDiv.innerHTML = html;
  } catch (error) {
    resultDiv.innerHTML = `Error: ${error.message}`;
  }
}
