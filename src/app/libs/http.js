import { stringify } from 'query-string';

class Http {
  constructor() {
    this.BASE_URL = process.env.API_URL;
  }

  get(url, data, headers) {
    return this.sendRequest('GET', url, data, headers);
  }

  put(url, data, headers) {
    return this.sendRequest('PUT', url, data, headers);
  }

  post(url, data, headers) {
    return this.sendRequest('POST', url, data, headers);
  }

  async sendRequest(method, url, data, headers) {
    if (method === 'GET' && data) {
      const query = stringify(data, { arrayFormat: 'comma' });

      // eslint-disable-next-line no-param-reassign
      url = `${url}?${query}`;
    }

    const response = await fetch(this.getUrl(url), {
      method,
      body: ['PUT', 'POST'].includes(method) ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    // TODO handle error
    if (response.status === 200) {
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.startsWith('application/json')) {
        return response.json();
      }

      return response.text();
    }

    return null;
  }

  getUrl(url) {
    return url.startsWith('http')
      ? url
      : `${this.BASE_URL}/${url}`;
  }
}

export const http = new Http();
