import { create } from '../../utils/renderer';

export const CharacterDetails = ({ name, link, imageUrl }) => {
  return create('div', {}, [
    create('div', {}, [
      create('span', { innerText: 'Character Name:' }),
      create('span', { innerText: name }),
    ]),
    create('div', {}, [create('img', { src: imageUrl })]),
    create('a', { innerText: 'More details', href: link }),
  ]);
};
