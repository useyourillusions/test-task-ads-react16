const config = {
    set1 : {
        baseUrl: 'https://vapc-ticketing.scn-demo.com',
        api: '/api/v1'
    }
};


class HTTP {
    constructor(config) {
        this.url = config.baseUrl + config.api;
        this.headers = {
            'Content-Type': 'application/json',
        };

        this.options = {
            headers: this.headers
        }
    }

    get({url, headers}) {
        this.options['method'] = 'GET';
        this.extendHeaders(headers);

        return fetch(this.url + url, this.options)
    }

    post({url, headers, body}) {
        this.options['method'] = 'POST';
        this.options['body'] = JSON.stringify(body || {});
        this.extendHeaders(headers);

        return fetch(this.url + url, this.options)
    }

    extendHeaders(headers) {
        let extendedHeaders = null;

        if (headers) {
            extendedHeaders = {
                ...headers,
                ...this.headers
            }
        }

        this.options.headers = extendedHeaders || this.headers;
    }
}

class BaseApi {
    constructor(http) {
        this.http = http;
    }

    async get(url) {
        const res = await this.http.get(url);

        return res.ok
            ? res.json()
            : this.handleError(res);
    }

    async handleError(res) {
        const info = {
            status: res.status,
            text: await res.text()
        };

        throw info;
    }
}

class Cinemas extends BaseApi {
    constructor(http) {
        super(http);
        this.baseUrl = '/cinemas';
    }

    getAll() {
        const url = this.baseUrl;
        return this.get(url);
    }

    getById(id) {
        const url = `${this.baseUrl}/${id}`;
        return this.get({url})
    }

    getWithMovies() {
        const url = `${this.baseUrl}/withMovies`;
        return this.get({url});
    }

    getByIdWithMovies(id) {
        const url = `${this.baseUrl}/${id}/withMovies`;
        return this.get({url});
    }

    getSessions(id) {
        const url = `${this.baseUrl}/${id}/sessions`;
        return this.get({url});
    }

    getTickets(cinemaId, sessionId) {
        const url = `${this.baseUrl}/${cinemaId}/sessions/${sessionId}/tickets`;
        return this.get({url});
    }

    getCategories(cinemaId, sessionId) {
        const url = `${this.baseUrl}/${cinemaId}/sessions/${sessionId}/area-categories`;
        return this.get({url});
    }
}


const http = new HTTP(config.set1);
const cinemas = new Cinemas(http);


cinemas.getAll().then(
    res => {console.log(res)},
    err => {console.log(err)}
);
