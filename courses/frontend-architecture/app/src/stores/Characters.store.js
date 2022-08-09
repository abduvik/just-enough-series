import { rerender } from '../utils/renderer';

export class CharactersStore {
  constructor(charactersApiService) {
    this.charactersApi = charactersApiService;
    this.characters = {};
  }

  fetchCharacters() {
    this.charactersApi.all().then((response) => {
      response.data.forEach((character) => {
        this.characters[character._id] = character;
      });
      rerender();
    });
  }

  fetchCharacter(id) {
    this.charactersApi.getCharacter(id).then((character) => {
      this.characters = {
        ...this.characters,
        [character._id]: character,
      };
      rerender();
    });
  }
}
