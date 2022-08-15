import { CharacterDetails } from '../../components/CharacterDetails/CharacterDetails';
import { dependencies } from '../../dependencies';
import { create, onMountedFactory } from '../../utils/renderer';

const onMounted = onMountedFactory();

export const CharactersDetailsContainer = (DI) => {
  const charactersStore = DI.getDependency(dependencies.charactersStore);
  const router = DI.getDependency(dependencies.router);
  const currentRoute = router.getCurrentRoute();
  const characterId = currentRoute.replace('/character/', '');

  onMounted(() => charactersStore.fetchCharacter(characterId));

  const character = charactersStore.characters[characterId];

  console.log(character);

  return character
    ? create('div', {}, [
        create('a', { innerText: '<- back home', href: '/' }),
        create('a', { href: `/character/${character._id}` }, [
          CharacterDetails({
            name: character.name,
            url: character.url,
            imageUrl: character.imageUrl,
          }),
        ]),
      ])
    : create('div');
};
