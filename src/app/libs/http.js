import { stringify } from 'query-string';

class Http {
  constructor() {
    this.BASE_URL = `${process.env.API_URL}`;
  }

  get(url, data, headers) {
    return this.sendRequest('GET', url, data, headers);
  }

  patch(url, data, headers) {
    return this.sendRequest('PATCH', url, data, headers);
  }

  post(url, data, headers) {
    return this.sendRequest('POST', url, data, headers);
  }

  delete(url, data, headers) {
    return this.sendRequest('DELETE', url, data, headers);
  }

  async sendRequest(method, url, data, headers) {
    if (method === 'GET' && data) {
      const query = stringify(data, { arrayFormat: 'comma' });

      // eslint-disable-next-line no-param-reassign
      url = `${url}?${query}`;
    }

    const delay = new Promise((res) => {
      setTimeout(() => res('foo'), 1000);
    });

    await delay;

    const response = await fetch(this.getUrl(url), {
      method,
      body: ['PATCH', 'POST', 'DELETE'].includes(method) ? JSON.stringify(data) : undefined,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    const contentType = response.headers.get('Content-Type');

    if (contentType?.startsWith('application/json')) {
      return [await response.json(), response.status];
    }

    return [await response.text(), response.status];
  }

  getUrl(url) {
    return url.startsWith('http')
      ? url
      : `${this.BASE_URL}/${url}`;
  }
}

export const http = new Http();
