async function fetchCoordinates(cityQuery){
        const response = await fetch("https://nominatim.openstreetmap.org/search?q=" + cityQuery + "&format=json&addressdetails=1&limit=1");
        if (!response.ok) throw new Error("error API");
        const result = await response.json();

        const lat = result[0].lat;
        const lon = result[0].lon;
        const cityName = result[0].name;
       
        return {
            lat, lon, cityName
        };
    };

const button = document.querySelector('button');
const input = document.getElementById('cityInput');
const gps = document.getElementById('gps');
const city = document.getElementById('city');
const details = document.getElementById('details');
const temperature = document.getElementById('temperature');

button.addEventListener('click', async function() {

  const cityInput = input.value;
  
  if (cityInput === '') {
    alert('Veuillez entrer une ville');
    return;
  }

  const coords = await fetchCoordinates(cityInput);
 console.log(coords);
  gps.textContent = `Coordonnées GPS : ${coords.lat}, ${coords.lon}`;
  city.textContent = `Ville : ${coords.cityName}`;
});

