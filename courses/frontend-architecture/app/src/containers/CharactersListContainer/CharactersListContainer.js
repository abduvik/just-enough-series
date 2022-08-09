import { CharacterItem } from '../../components/CharacterItem';
import { dependencies } from '../../dependencies';
import { create, onMountedFactory } from '../../utils/renderer';

const onMounted = onMountedFactory();

export const CharactersListContainer = (DI) => {
  const charactersStore = DI.getDependency(dependencies.charactersStore);

  onMounted(() => charactersStore.fetchCharacters());

  const characters = Object.values(charactersStore.characters);

  return create('div', {}, [
    create('div', { innerText: 'List of Disney Characters' }),
    create(
      'ul',
      {},
      characters.map((character) =>
        create('a', { href: `/character/${character._id}` }, [
          CharacterItem(character.name),
        ])
      )
    ),
  ]);
};
