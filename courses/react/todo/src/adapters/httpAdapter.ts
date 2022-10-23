export class HttpAdapter {
  baseUrl: string;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
  }

  get<T>(url: string): Promise<T> {
    return fetch(this.baseUrl + url).then((response) => response.json());
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
