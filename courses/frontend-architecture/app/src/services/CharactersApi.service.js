export class CharactersApiService {
  constructor(api) {
    this.api = api;
  }

  all() {
    return this.api.get('/characters');
  }

  getCharacter(id) {
    return this.api.get(`/characters/${id}`);
  }
}
