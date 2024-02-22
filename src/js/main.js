import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import weatherCall from "./weatherCall.mjs";

async function fetchData() {
  const dataSource = new ExternalServices();
  const json = await dataSource.getData();

  const apiKey = "d1bf7498feb4f8b222047310ce70549e";
  const key = new weatherCall();

  const form = document.getElementById("searchForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting
    const searchType = form.elements.searchType.value;
    const searchValue = form.elements.searchValue.value;

    if (searchType === "random") {
      const value = randomSelection(json);
      templateSelection(value, key, apiKey);
      console.log("Search Type:", searchType);
    } else if (searchType === "name") {
      const value = nameSelection(json, searchValue);
      templateSelection(value, key, apiKey);
      console.log("Search Type:", searchType);
    } else if (searchType === "temperature") {
      console.log("Search Type:", searchType);
    }

    
  });
}

function randomSelection(json) {
  let mergedArray = [...json.pueblosmagicos, ...json.playasmexico];
  let result = mergedArray[Math.floor(Math.random() * mergedArray.length)];
  return result;
}

function nameSelection(json, searchValue) {
  let mergedArray = [...json.pueblosmagicos, ...json.playasmexico];
  let result = mergedArray.find((obj) => obj.name === searchValue);
  return result;
}

function templateSelection(result, key, apiKey) {
  const lat = result.lat;
  const long = result.long;

  localStorage.setItem("lat",lat);
  localStorage.setItem("long",long);
  getLocation(saveLocation, lat, long);
  


  key
    .getWeather(lat, long, apiKey)
    .then((data) => {
      let resultElement = document.getElementById("result");
      if (result) {
        resultElement.innerHTML = `
          <li class="dest_card">
              <img
                src="${result.image_url}"
                alt="${result.name}"
              />
              <h2 class="c_name">${result.name}</h2>
              <h2 class="c_name">${data.main.temp}°C</h2>
              <p class="destination-c_description">${
                data.weather[0].description
              }</p>
              <p class="destination-c_description">${result.description}</p>
              <p class="destination-c_activities">Activities: ${result.activities.join(
                ", "
              )}</p>
              <a class="destination-c_website" href="${
                result.website_url
              }">Website</a>
              <button class="c_button" id="cancelButton">Cancel</button>
          </li>
        `;
      } else {
        resultElement.textContent = "No result found.";
      }

      const cancelButton = document.getElementById("cancelButton");
      cancelButton.addEventListener("click", function () {
        resultElement.innerHTML = ""; // Clear the result element
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function getLocation(callback) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
      callback(latitude, longitude);    
      }, function(error){
        console.error("Error getting geolocation:", error);
      });
  } else {
    console.log("Geolocation is not available.");
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);  // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

let savedLatitude;
let savedLongitude;


function saveLocation(latitude, longitude, latstorage, longstorage) {
  savedLatitude = latitude;
  savedLongitude = longitude;
  var latstorage = localStorage.getItem("lat");
  var longstorage = localStorage.getItem("long");


  console.log("Location saved - Latitude:", savedLatitude, "Longitude:", savedLongitude, "Target Latitude:", latstorage, "Target Longitude:", longstorage);

  // Calculate the distance
  const distance = calculateDistance(savedLatitude, savedLongitude, latstorage, longstorage); 
  console.log("Distance to the place:", distance.toFixed(2), "km");
  setTimeout(function() {
    alert("Distance to the place: " + distance.toFixed(2) + " km");
  },  1000);
  
}



fetchData();

loadHeaderFooter(
  "header",
  "footer",
  "/partials/header.html",
  "/partials/footer.html"
);
