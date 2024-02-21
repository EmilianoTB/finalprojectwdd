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
      var path = window.location.pathname;
      var parts = path.split('/');
      var filename = parts[parts.length - 1];

      let jsonKey;
      if (filename === 'beachesmexico.html') {
          jsonKey = 'playasmexico';
      } else if (filename === 'pueblosmagicos.html') {
          jsonKey = 'pueblosmagicos';
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
  `).join('');
}



