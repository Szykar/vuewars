import { usePredicate } from '@/composables/usePredicate';

describe('usePredicate', () => {
  it('should set predicate', () => {
    const {
      predicate,
      setPredicate,
    } = usePredicate();

    setPredicate('Test');

    expect(predicate.value)
      .toEqual('Test');
  });
});
