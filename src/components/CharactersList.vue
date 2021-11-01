<template>
  <div class="container">
    <transition-group name="list" tag="div">
      <template
        v-for="(character, index) in characters"
        :key="`character_${index}`"
      >
        <character-element
          :character="character"
        />
      </template>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CharacterElement from '@/components/CharacterElement.vue';
import { CharacterType } from '@/types/StarWarsTypes';

@Options({
  components: { CharacterElement },
  props: {
    characters: Array,
  },
})

export default class CharactersList extends Vue {
  characters!: Array<CharacterType>;
}
</script>

<style scoped lang="scss">
.list-item {
  display: inline-block;
}

.list-enter-active,
.list-leave-active {
  transition: all .7s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(25px) scaleX(1.3);
}
</style>
