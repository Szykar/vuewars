import { Ref, ref } from 'vue';

const currentPage = ref<number>(1);

// eslint-disable-next-line import/prefer-default-export
export const usePagination = (): {
  currentPage: Ref<number>,
  setPage: (page: number) => void
} => {
  const setPage = (page: number): void => {
    currentPage.value = page;
  };

  return {
    currentPage,
    setPage,
  };
};
