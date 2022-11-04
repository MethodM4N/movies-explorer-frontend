class MoviesApi {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(this.url + '/beatfilm-movies', {
      headers: this.headers,
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} ${res.message}`);
    }
    return res.json();
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default moviesApi;