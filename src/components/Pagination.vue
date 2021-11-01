<template>
  <div class="pagination-wrapper">
    <button
      v-for="(_, index) in Array(pagesCount)"
      :class="{current: (currentPage - 1) === index}"
      :key="index"
      @click="setPage(index + 1)"
    >
      {{ index + 1 }}
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

/* TODO Limit number of visible buttons */

@Options({
  props: {
    pagesCount: Number,
    currentPage: Number,
  },
})

export default class SearchBox extends Vue {
  setPage(page: number): void {
    this.$emit('setPage', page);
  }
}
</script>

<style lang="scss">
.pagination-wrapper {
  margin: auto auto 12px auto;

  button {
    padding: 4px 12px;
    margin: 4px;
    font-size: 14px;
    font-weight: bold;
    color: #4d0404;
    background: #b02e2e;
    border: 1px solid #9d9112;
    cursor: pointer;

    &.current {
      background: #9d9112;
    }
  }
}
</style>
