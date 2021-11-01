/* eslint-disable object-curly-newline */
import { computed, ComputedRef, Ref, ref } from 'vue';
import { CharacterType } from '@/types/StarWarsTypes';

const STORAGE_PREFIX = 'STAR_WARS_';
const PAGE_SIZE = 10;

const resourceCount = ref<number>(0);
const currentPage = ref<number>(1);
const predicate = ref<string>('');
const isProcessing = ref<boolean>(false);
const isNextPage = ref<boolean>(false);
const isError = ref<boolean>(false);

// eslint-disable-next-line import/prefer-default-export
export const useStarWarsApi = (resource: 'people' = 'people'): {
  fetchCharacters: () => void;
  currentPageCharacters: ComputedRef<Array<CharacterType>>;
  pagesCount: ComputedRef<number>,
  currentPage: Ref<number>,
  setPage: (page: number) => void;
  /* search */
  predicate: Ref<string>;
  setPredicate: (event: Event) => void;
  /* api client state */
  isProcessing: Ref<boolean>;
  isError: Ref<boolean>;
} => {
  let currentApiPage = 1;

  const setPredicate = (event: Event) => {
    predicate.value = (<HTMLInputElement>event.target).value;
  };

  const setStorage = (key: 'people' = 'people', value: Array<CharacterType>): void => {
    window.localStorage.setItem(STORAGE_PREFIX.concat(key), JSON.stringify(value));
  };

  const getStorage = (key: 'people' = 'people'): Array<CharacterType> => {
    const storageValue = window.localStorage.getItem(STORAGE_PREFIX.concat(key));
    if (!storageValue) {
      return [];
    }

    return JSON.parse(storageValue);
  };

  const fetchCharacters = (): void => {
    const storage = getStorage();
    if (storage.length) {
      return;
    }

    isProcessing.value = true;
    fetch(`https://swapi.dev/api/${resource}/?page=${currentApiPage}`)
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

  const filteredCharacters = computed(() => getStorage(resource)
    .filter((character) => character.name.toLocaleLowerCase()
      .includes(predicate.value.toLocaleLowerCase())));

  const currentPageCharacters = computed(
    () => {
      const offset = (currentPage.value - 1) * PAGE_SIZE;

      return filteredCharacters.value.slice(offset, offset + PAGE_SIZE);
    },
  );

  const pagesCount = computed(
    () => Math.ceil(filteredCharacters.value.length / PAGE_SIZE),
  );

  const setPage = (page: number): void => {
    currentPage.value = page;
  };

  return {
    fetchCharacters,
    currentPageCharacters,
    pagesCount,
    currentPage,
    setPage,
    predicate,
    setPredicate,
    isProcessing,
    isError,
  };
};
