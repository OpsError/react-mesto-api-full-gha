class AuthApi {
    constructor(baseUrl) {
        this._url = baseUrl;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
          }
        return Promise.reject(new Error('Произошла ошибка'));
    }

    signup({email, password}) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
        .then (this._handleResponse);
    }

    signin({email, password}) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'password': password,
                'email': email
            })
        })
        .then (this._handleResponse);
    }

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        .then (this._handleResponse);
    }
}

const authApi = new AuthApi('https://api.asta.nomoredomains.rocks');

export default authApi;