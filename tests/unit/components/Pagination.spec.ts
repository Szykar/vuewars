import { shallowMount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';

describe('SearchBox.vue', () => {
  it('should show specified amount of buttons', async () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        pagesCount: 3,
        currentPage: 2,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setPage() {
        },
      },
    });
    const buttons = wrapper.findAll('button');
    expect(wrapper.findAll('button'))
      .toHaveLength(3);

    expect(buttons[1].classes())
      .toContain('current');
  });
  it('should emit event on button click', async () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        pagesCount: 3,
        currentPage: 1,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setPage() {
        },
      },
    });
    expect(wrapper.findAll('button')[1].trigger('click'));

    const setPageEvent = wrapper.emitted('setPage');
    expect(setPageEvent)
      .toHaveLength(1);
    expect((<Array<Array<number>>>setPageEvent)[0])
      .toEqual([2]);
  });
});
