import { mount } from '@vue/test-utils';
import CharactersFixtures from '../fixtures/CharactersFixtures';
import CharactersList from '@/components/CharactersList.vue';

const {
  HanSolo,
  LukeSkywalker,
} = CharactersFixtures;

describe('CharactersList.vue', () => {
  it('should list characters from store', async () => {
    const wrapper = mount(CharactersList, {
      props: {
        characters: [
          LukeSkywalker,
          HanSolo,
        ],
      },
    });
    expect(wrapper.text())
      .toContain('Luke');
    expect(wrapper.text())
      .toContain('Han');
  });
});
