async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      throw { name: "servicesError", message: error.message };
    }
  }
  
  export default class weatherCall {
    constructor(apiKey) {
      this.apiKey = apiKey;
    }
  
    async getWeather(latitude, longitude, apiKey) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        try {
            const data = await fetchData(url);
            return data;
        } catch (error) {
            throw error;
        }
    }
}    
  
