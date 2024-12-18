export default class Request {
  async #makeRequest(url, options) {
    try {
      const response = await fetch(url, options);
      let data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
  async getData(url, options) {
    return this.#makeRequest(url, options);
  }

  async getGame(url, id, options) {
    return this.#makeRequest(`${url}game?id=${id}`, options);
  }
}
