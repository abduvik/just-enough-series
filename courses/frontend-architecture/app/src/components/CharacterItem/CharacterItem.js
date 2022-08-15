import { create } from '../../utils/renderer';

export const CharacterItem = (name) => {
  return create('li', {}, [
    create('span', { innerText: 'Name: ' }),
    create('span', { innerText: name }),
  ]);
};
