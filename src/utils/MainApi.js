class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if(!res.ok) {
      const resJson = res.json();
      return resJson.then((resJson) => {
        return Promise.reject(resJson.message);
      });
    } else {
      return res.json();
    }
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then(this._checkResponse);
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(this._checkResponse);
  }

  // checkToken(token)  {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     }
  //   })
  //   .then(this._checkResponse);
  // }

  setToken() {
    this._headers['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      // credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  updateUserData(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      // credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      // credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  saveMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      // credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        director: data.director,
        country: data.country,
        year: data.year,
        duration: data.duration,
        description: data.description,
        trailerLink: data.trailerLink,
        image: `https://api.nomoreparties.co${data.image.url}`,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`
      })
    })
    .then(this._checkResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.movies.katieperca.nomoredomains.icu',
  // baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default mainApi;