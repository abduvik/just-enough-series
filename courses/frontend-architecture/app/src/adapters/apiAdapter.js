export class ApiAdapter {
  constructor(env) {
    this.env = env;
  }

  get(apiUrl) {
    return fetch(this.env.endpoint + apiUrl).then((response) =>
      response.json()
    );
  }

  post(apiUrl, data) {
    return fetch(this.env.endpoint + apiUrl, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
}
