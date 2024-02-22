import { renderListWithTemplate, renderWithTemplate } from "./utils.mjs";


/**
 * @param {string}
 * @param {ExternalServices} dataSource 
 * @param {Element} listElement 
 */


export default class PlacesList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    

    // Populate list of locations
    async init() {
      const title = document.getElementById('getId');
      const titleId = title.textContent.trim(); // Get the text content of the title tag and remove any leading or trailing whitespace
  
      let jsonKey;
      if (titleId === "BeachesMexico") {
          jsonKey = "playasmexico";
      } else if (titleId === "PueblosMagicos") {
          jsonKey = "pueblosmagicos";
      } else if (filename == "search.html"){
        jsonKey;
      }
      const json = await this.dataSource.getData(jsonKey);
      const locations = json[jsonKey];
      this.renderList(locations);

    }

  
    renderList(locations) {
        renderWithTemplate(productCardTemplate, this.listElement, locations);
    }

    
}


function productCardTemplate(locations) {
  return locations.map(location => `
    <li class="destination-card">
        <img
          src="${location.image_url}"
          alt="${location.name}"
        />
        <h3 class="card__location">${location.location}</h3>
        <h2 class="card__name">${location.name}</h2>
        <p class="destination-card__description">${location.description}</p>
        <p class="destination-card__activities">Activities: ${location.activities.join(", ")}</p>
        <a class="destination-card__website" href="${location.website_url}">Website</a>
      </a>
    </li>
  `).join("");
}



