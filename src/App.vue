<template>
  <h1>Star Wars characters</h1>
  <div v-if="starWars.isError">Unfortunately, an error occurred :-(!</div>
  <div
    v-if="starWars.isProcessing"
    class="loading"
  >
    Loading in progress...
    <div class="star">⭐</div>
  </div>
  <search-box v-else/>
  <characters-list
    :characters="starWars.currentPageCharacters"
  />
  <pagination
    :pages-count="starWars.pagesCount"
    :current-page="starWars.currentPage"
    @set-page="starWars.setPage($event)"
  />
</template>

<script lang="ts">
import { Options, setup, Vue } from 'vue-class-component';
import { onMounted } from 'vue';
import CharactersList from '@/components/CharactersList.vue';
import SearchBox from '@/components/SearchBox.vue';
import { useStarWarsApi } from '@/composables/useStarWarsApi';
import Pagination from '@/components/Pagination.vue';

@Options({
  components: {
    Pagination,
    SearchBox,
    CharactersList,
  },
})

export default class App extends Vue {
  starWars = setup(() => {
    const {
      fetchCharacters,
      currentPageCharacters,
      isProcessing,
      isError,
      pagesCount,
      currentPage,
      setPage,
    } = useStarWarsApi();

    onMounted(() => fetchCharacters());

    return {
      fetchCharacters,
      currentPageCharacters,
      isProcessing,
      isError,
      pagesCount,
      currentPage,
      setPage,
    };
  });

  getMore(): void {
    this.starWars.fetchCharacters();
  }
}
</script>

<style lang="scss">
body {
  background: #1d1d70;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f6e422;
  margin-top: 40px;
  font-size: 18px;
}

.star {
  display: inline-block;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(300deg);
  }
}
</style>
