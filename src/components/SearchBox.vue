<template>
  <div class="search-box-wrapper">
    <input
      type="text"
      placeholder="Start typing please"
      v-model="starWars.predicate"
      @change="starWars.setPredicate($event.target.value)"
    >
  </div>
</template>

<script lang="ts">
import { setup, Vue } from 'vue-class-component';
import { usePredicate } from '@/composables/usePredicate';

export default class SearchBox extends Vue {
  starWars = setup(() => {
    const {
      predicate,
      setPredicate,
    } = usePredicate();

    return {
      predicate,
      setPredicate,
    };
  });
}
</script>

<style lang="scss">
.search-box-wrapper {
  width: 200px;
  margin: auto auto 12px auto;
  position: relative;

  input[type=text] {
    border: 0;
    box-shadow: 1px 1px 0 #f6e422;
    box-sizing: border-box;
    background-color: #565656;;
    color: #f6e422;
    width: 200px;
    font-size: 16px;
    padding: 8px 6px;

    &::placeholder {
      color: #b6a814;
    }
  }

  &::after {
    position: absolute;
    content: '🔍';
    filter: grayscale(1);
    right: 6px;
    top: 7px;
  }
}
</style>
