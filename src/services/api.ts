const api = {
  baseUrl: 'https://aviasales-test-api.kata.academy',
  searchId: '',

  async initApp() {
    const resp = await fetch(`${this.baseUrl}/search`);
    const data = await resp.json();

    if (!resp.ok) {
      return false;
    }
    this.searchId = data.searchId;
    return true;
  },

  async getTickets() {
    const resp = await fetch(`${this.baseUrl}/tickets?searchId=${this.searchId}`);
    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(`${data.status_message}`);
    }
    return data;
  },
};

export default api;
