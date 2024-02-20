async function readLocalJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    throw { name: "servicesError", message: error.message };
  }
}

export default class ExternalServices {
  constructor() {
  this.path = `/json/travel_info.json`;
  }
  async getData() {
    try {
      const data = await readLocalJSON(this.path);
      return data;
    } catch (error) {
      throw error;
    }
  }
}