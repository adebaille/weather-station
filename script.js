async function fetchCoordinates(cityQuery) {
  const response = await fetch(
    "https://nominatim.openstreetmap.org/search?q=" + cityQuery + "&format=json&addressdetails=1&limit=1"
  );
  if (!response.ok) throw new Error("error API");
  const result = await response.json();

  if (result.length === 0) {
    throw new Error("Ville non trouvée");
  }

  const lat = result[0].lat;
  const lon = result[0].lon;
  const cityName = result[0].name;

  return {
    lat,
    lon,
    cityName,
  };
}

const button = document.querySelector("button");
const input = document.getElementById("cityInput");
const gps = document.getElementById("gps");
const city = document.getElementById("city");
const details = document.getElementById("details");
const temperature = document.getElementById("temperature");

gps.textContent = "";
city.textContent = "";
temperature.textContent = "";
details.textContent = "";

async function fetchWeather(lat, lon) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,relative_humidity_2m`
  );
  if (!response.ok) throw new Error("error API météo");
  const result = await response.json();
  
  return result.current;
}

button.addEventListener("click", async function () {
  const cityInput = input.value;

  if (cityInput === "") {
    alert("Veuillez entrer une ville");
    return;
  }

   try {
    const coords = await fetchCoordinates(cityInput);
    const weather = await fetchWeather(coords.lat, coords.lon);

    gps.textContent = `Coordonnées GPS : ${coords.lat}, ${coords.lon}`;
    city.textContent = `Ville : ${coords.cityName}`;
    temperature.textContent = `Température : ${weather.temperature_2m}°C`;
  } catch (error) {
    gps.textContent = "";
    city.textContent = "";
    temperature.textContent = "";
    details.textContent = `Ville non trouvée`;
  }
});
