class Api {
    constructor(config) {
        this._url = config.baseUrl;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
          }
        return Promise.reject(new Error('Произошла ошибка'));
    }

    getToken() {
        return localStorage.getItem('token');
    }

    putHeaders() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`,
        }
        return headers;
    }

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this.putHeaders(),
        })
            .then (this._handleResponse);
    }

    getCard() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this.putHeaders()
        })
            .then (this._handleResponse);
    }

    patchInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this.putHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then (this._handleResponse);
    }

    postCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this.putHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then (this._handleResponse);
    }

    changeLikeCardStatus(data, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/${data}/likes`, {
                method: 'DELETE',
                headers: this.putHeaders(),
                body: JSON.stringify({data})
            })
                .then (this._handleResponse);
        } else {
            return fetch(`${this._url}/cards/${data}/likes`, {
                method: 'PUT',
                headers: this.putHeaders(),
                body: JSON.stringify({data})
            })
                .then (this._handleResponse);
        }
    }

    deleteCard(data) {
        return fetch(`${this._url}/cards/${data}`, {
            method: 'DELETE',
            headers: this.putHeaders(),
            body: JSON.stringify({data})
        })
            .then (this._handleResponse);
    }

    putLike(data) {
        return fetch(`${this._url}/cards/${data}/likes`, {
            method: 'PUT',
            headers: this.putHeaders(),
            body: JSON.stringify({data})
        })
            .then (this._handleResponse);
    }

    deleteLike(data) {
        return fetch(`${this._url}/cards/${data}/likes`, {
            method: 'DELETE',
            headers: this.putHeaders(),
            body: JSON.stringify({data})
        })
            .then (this._handleResponse);
    }

    patchAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.putHeaders(),
            body: JSON.stringify({
                avatar: link
            })
        })
            .then (this._handleResponse);
    }
}

const api = new Api({
    baseUrl: 'https://api.asta.nomoredomains.rocks',
});

export default api;