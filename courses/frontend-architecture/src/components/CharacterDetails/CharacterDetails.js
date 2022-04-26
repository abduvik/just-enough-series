import { create } from '../../utils/renderer';

export const CharacterDetails = (name, link, imgUrl) => {
  return create('div', {}, [
    create('div', {}, [
      create('span', { innerText: 'Character Name:' }),
      create('span', { innerText: name }),
    ]),
    create('img', { src: imgUrl }),
    create('a', { innerText: 'More details', href: link }),
  ]);
};
