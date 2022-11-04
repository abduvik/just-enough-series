export class HttpAdapter {
  baseUrl: string;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
  }

  get<T>(url: string, params: any = {}): Promise<T> {
    const query = Object.keys(params?.query || {})
      .map((key) => `${key}=${params.query[key]}`)
      .join("&");

    const requestUrl = this.baseUrl + url + (query ? `?${query}` : "");
    return fetch(requestUrl).then((response) => response.json());
  }

  post<T>(url: string, data: T) {
    return fetch(this.baseUrl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }

  patch<T>(url: string, data: T) {
    return fetch(this.baseUrl + url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }

  delete<T>(url: string, data: T) {
    return fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
}
