import { ref, Ref } from 'vue';

const predicate = ref<string>('');

// eslint-disable-next-line import/prefer-default-export
export const usePredicate = (): {
  predicate: Ref<string>;
  setPredicate: (text: string) => void;
} => {
  const setPredicate = (text: string) => {
    predicate.value = text;
  };

  return {
    predicate,
    setPredicate,
  };
};
