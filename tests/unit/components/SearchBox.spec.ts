import { shallowMount } from '@vue/test-utils';
import SearchBox from '@/components/SearchBox.vue';
import { usePredicate } from '@/composables/usePredicate';

describe('SearchBox.vue', () => {
  it('should update predicate state on input event', async () => {
    const { predicate } = usePredicate();
    expect(predicate.value)
      .toEqual('');

    const wrapper = shallowMount(SearchBox);
    const input = wrapper.find('input');

    await input.setValue('Luke');
    expect(predicate.value)
      .toEqual('Luke');

    await input.setValue('something random');
    expect(predicate.value)
      .toEqual('something random');
  });
});
