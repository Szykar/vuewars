import { shallowMount } from '@vue/test-utils';
import CharacterElement from '@/components/CharacterElement.vue';
import CharactersFixtures from '../fixtures/CharactersFixtures';

const Luke = CharactersFixtures.LukeSkywalker;

describe('CharacterElement.vue', () => {
  it('should display character name', () => {
    const wrapper = shallowMount(CharacterElement, {
      props: { character: Luke },
    });
    expect(wrapper.text())
      .toContain(Luke.name);
  });

  it('should show details on button click', async () => {
    const wrapper = shallowMount(CharacterElement, {
      props: { character: Luke },
    });
    await wrapper.find('button')
      .trigger('click');
    const text = wrapper.text();
    expect(text)
      .toContain(`Height: ${Luke.height} cm`);
    expect(text)
      .toContain(`Mass: ${Luke.mass} kg`);
    expect(text)
      .toContain(`Hair color: ${Luke.hair_color}`);
    expect(text)
      .toContain(`Skin color: ${Luke.skin_color}`);
    expect(text)
      .toContain(`Eye color: ${Luke.eye_color}`);
    expect(text)
      .toContain(`Birth year: ${Luke.birth_year}`);
    expect(text)
      .toContain(`Gender: ${Luke.gender}`);
  });

  it('should hide details on the second button click', async () => {
    const wrapper = shallowMount(CharacterElement, {
      props: { character: Luke },
    });
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.text())
      .toContain(`Height: ${Luke.height} cm`);
    await button.trigger('click');
    expect(wrapper.text())
      .not
      .toContain(`Height: ${Luke.height} cm`);
  });
});
