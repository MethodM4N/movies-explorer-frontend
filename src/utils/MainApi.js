import moviesApi from "./MoviesApi";

class MainApi {
   constructor({ baseUrl }) {
      this._url = baseUrl;
   }

   signUp(data) {
      return fetch(`${this._url}/signup`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         credentials: 'include',
         body: JSON.stringify({
            password: data.password,
            email: data.email,
            name: data.name,
         })
      })
      .then(res => {
         return this._getResponseData(res);
      });
   }

   signIn(data) {
      return fetch(`${this._url}/signin`, {
         method: 'POST',
         credentials: 'include',  
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            password: data.password,
            email: data.email
         })
      })
      .then(res => {
         return this._getResponseData(res);
      });
   }

   signOut() {
      return fetch(`${this._url}/signout`, {
         method: 'GET',
         credentials: 'include',  
         headers: {
            'Content-Type': 'application/json',
         },
      })
      .then(res => {
      return this._getResponseData(res);
      });
   }

   checkToken() {
      return fetch(`${this._url}/users/me`, {
         method: 'GET',
         credentials: 'include',  
         headers: {
            "Content-Type": "application/json"
         }
      })
      .then(res => {
         return this._getResponseData(res);
      });
   }

   updateUserInfo(profile) {
      return fetch(`${this._url}/users/me`, {
         method: 'PATCH',
         headers: {
            "Content-Type": "application/json"
         },
         credentials: 'include',
         body: JSON.stringify({
            name: profile.name,
            email: profile.email
         })
      })
      .then(res => {
         return this._getResponseData(res);
      });
   }

   saveMovie = (movie) => {
      return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
         "country": movie.country,
         "director": movie.director,
         "duration": movie.duration,
         "year": movie.year,
         "description": movie.description,
         "image": moviesApi.url+movie.image.url,
         "trailerLink": movie.trailerLink,
         "thumbnail":  moviesApi.url+movie.image.formats.thumbnail.url,
         "movieId": movie.id,
         "nameRU": movie.nameRU,
         "nameEN": movie.nameEN
      }),
   })
      .then(res => {
         return this._getResponseData(res);
      });
   }

   deleteMovie = (movie) => {
      return fetch(`${this._url}/movies/${movie._id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
         credentials: 'include',
      })
         .then(res => {
            return this._getResponseData(res);
         });
   }

   getSavedMovies = () => {
      return fetch(`${this._url}/movies`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
         credentials: 'include',
      })
         .then(res => {
            return this._getResponseData(res);
         });
      };

   _getResponseData(res) {
      if (!res.ok) {
         return Promise.reject(`Ошибка: ${res.status} ${res.message}`);
      }
      return res.json();
   }

}

export const mainApi = new MainApi({
   baseUrl: 'https://api.movies.kolganov.nomorepartiesxyz.ru'
})