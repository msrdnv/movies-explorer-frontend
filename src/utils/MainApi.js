class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  };

  register(data) {
    return this._request(`${this._baseUrl}/signup`, { method: 'POST', headers: this._headers, body: JSON.stringify(data) });
  };

  login(data) {
    return this._request(`${this._baseUrl}/signin`, { method: 'POST', headers: this._headers, body: JSON.stringify(data) });
  };

  getCurrentUser(token) {
    return this._request(`${this._baseUrl}/users/me`, { method: 'GET', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }});
  };

  editCurrentUser (data, token) {
    return this._request(`${this._baseUrl}/users/me`, { method: 'PATCH', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }, body: JSON.stringify(data)});
  };

  getSavedMovies (token) {
    return this._request(`${this._baseUrl}/movies`, { method: 'GET', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }});
  };

  postNewMovie (data, token) {
    return this._request(`${this._baseUrl}/movies`, { method: 'POST', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }, body: JSON.stringify(data)});
  };

  deleteMovie (movieId, token) {
    return this._request(`${this._baseUrl}/movies/${movieId}`, { method: 'DELETE', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }});
  };
};

export const mainApi = new MainApi({
  baseUrl: 'https://api.movies.msrdnv.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json',
  }
});
