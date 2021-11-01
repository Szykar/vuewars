import { computed } from 'vue';
import { usePagination } from '@/composables/usePagination';

describe('usePagination', () => {
  it('should set page from range range', () => {
    const itemsCount = computed(() => 15);

    const {
      currentPage,
      setPage,
    } = usePagination(itemsCount, 5);

    expect(currentPage.value)
      .toEqual(1);

    setPage(3);

    expect(currentPage.value)
      .toEqual(3);
  });
  it('should not set page outside pages range', () => {
    const itemsCount = computed(() => 15);

    const {
      currentPage,
      setPage,
    } = usePagination(itemsCount, 5);

    setPage(1);
    expect(currentPage.value)
      .toEqual(1);

    setPage(4);

    expect(currentPage.value)
      .toEqual(1);
  });
  it.each<Array<number>>([
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 2],
    [5, 3],
    [99, 50],
    [100, 50],
    [101, 51],
  ])('should count from %s items %s pages for pageSize=2', (itemsCount, expected) => {
    const {
      pagesCount,
    } = usePagination(computed(() => itemsCount), 2);

    expect(pagesCount.value)
      .toEqual(expected);
  });
});
