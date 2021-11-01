import {
  computed, ComputedRef, Ref, ref,
} from 'vue';

const currentPage = ref<number>(1);

// eslint-disable-next-line import/prefer-default-export
export const usePagination = (itemsCount: ComputedRef, pageSize: number): {
  currentPage: Ref<number>,
  pagesCount: ComputedRef<number>,
  setPage: (page: number) => void
} => {
  const pagesCount = computed(
    () => Math.ceil(itemsCount.value / pageSize),
  );

  const setPage = (page: number): void => {
    if (page > pagesCount.value) {
      return;
    }
    currentPage.value = page;
  };

  return {
    currentPage,
    pagesCount,
    setPage,
  };
};
