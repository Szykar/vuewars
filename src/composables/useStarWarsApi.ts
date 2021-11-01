/* eslint-disable object-curly-newline,function-paren-newline */
import { computed, ComputedRef, Ref, ref } from 'vue';
import { CharacterType } from '@/types/StarWarsTypes';
import { usePagination } from '@/composables/usePagination';
import { usePredicate } from '@/composables/usePredicate';

const STORAGE_PREFIX = 'STAR_WARS_';
const PAGE_SIZE = 10;

const resourceCount = ref<number>(0);
const isProcessing = ref<boolean>(false);
const isNextPage = ref<boolean>(false);
const isError = ref<boolean>(false);

// eslint-disable-next-line import/prefer-default-export
export const useStarWarsApi = (
  resource: 'people' = 'people',
  localStorage: Storage = window.localStorage,
  fetchApi: (input: RequestInfo, init?: RequestInit) => Promise<Response> = window.fetch,
): {
  fetchCharacters: () => void;
  currentPageCharacters: ComputedRef<Array<CharacterType>>;
  pagesCount: ComputedRef<number>;
  currentPage: Ref<number>;
  setPage: (page: number) => void;
  /* api client state */
  isProcessing: Ref<boolean>;
  isError: Ref<boolean>;
} => {
  const setStorage = (key: 'people' = 'people', value: Array<CharacterType>): void => {
    localStorage.setItem(STORAGE_PREFIX.concat(key), JSON.stringify(value));
  };

  const getStorage = (key: 'people' = 'people'): Array<CharacterType> => {
    const storageValue = localStorage.getItem(STORAGE_PREFIX.concat(key));
    if (!storageValue) {
      return [];
    }

    return JSON.parse(storageValue);
  };

  let currentApiPage = 1;

  const fetchCharacters = (): void => {
    const storage = getStorage();
    if (storage.length) {
      return;
    }

    isProcessing.value = true;
    fetchApi(`https://swapi.dev/api/${resource}/?page=${currentApiPage}`)
      .then((res: Response) => res.json())
      .then(({
        count,
        results,
        next,
      }) => {
        if (results) {
          setStorage(resource, [...getStorage(resource), ...results]);
        }
        currentApiPage += 1;
        resourceCount.value = count;
        isNextPage.value = Boolean(next);
        if (isNextPage.value) {
          fetchCharacters();
        }
      })
      .catch(() => {
        isError.value = true;
      })
      .finally(() => {
        isProcessing.value = false;
      });
  };

  const { predicate } = usePredicate();

  const filteredCharacters = computed(() => getStorage(resource)
    .filter((character) => character.name.toLocaleLowerCase()
      .includes(predicate.value.toLocaleLowerCase())));

  const itemsCount = computed(
    () => filteredCharacters.value.length,
  );

  const {
    currentPage,
    pagesCount,
    setPage,
  } = usePagination(itemsCount, PAGE_SIZE);

  const currentPageCharacters = computed(
    () => {
      const offset = (currentPage.value - 1) * PAGE_SIZE;

      return filteredCharacters.value.slice(offset, offset + PAGE_SIZE);
    },
  );

  return {
    fetchCharacters,
    currentPageCharacters,
    pagesCount,
    currentPage,
    setPage,
    isProcessing,
    isError,
  };
};
