<template>
  <div class="character">
    <div class="name-bar">
      <div class="name">
        {{ character.name }}
      </div>
      <div>
        <button @click="toggleDetails" :class="{shown: showDetails}">{{
            showDetails ? '-' : '+'
          }}
        </button>
      </div>
    </div>
    <transition name="bounce">
      <div v-if="showDetails" class="details">
        <div>Height: {{ character.height }} cm</div>
        <div>Mass: {{ character.mass }} kg</div>
        <div>Hair color: {{ character.hair_color }}</div>
        <div>Skin color: {{ character.skin_color }}</div>
        <div>Eye color: {{ character.eye_color }}</div>
        <div>Birth year: {{ character.birth_year }}</div>
        <div>Gender: {{ character.gender }}</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { CharacterType } from '@/types/StarWarsTypes';

@Options({
  props: {
    character: Object as () => CharacterType,
  },
})

export default class CharacterElement extends Vue {
  showDetails = false;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}
</script>

<style scoped lang="scss">
.character {
  border: 1px solid #9d9112;
  border-radius: 1px;
  width: 200px;
  margin: auto auto 12px auto;
  overflow: hidden;

  .name-bar {
    display: flex;
    height: 25px;

    .name {
      background: #256ac4;
      flex: 1;
      line-height: 25px;
    }

    button {
      border: 0;
      height: 100%;
      width: 25px;
      font-size: 20px;
      color: #4d0404;
      background: #b02e2e;
      cursor: pointer;

      &.shown {
        background-color: #f19e06;
      }
    }
  }

  .details {
    border-top: 1px solid #9d9112;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.bounce-enter-active {
  animation: bounce-in .4s;
}

.bounce-leave-active {
  animation: bounce-in .4s reverse;
}

@keyframes bounce-in {
  0% {
    transform: rotateX(-90deg);
  }
  50% {
    transform: rotateX(-60deg);
  }
  100% {
    transform: rotateX(0);
  }
}
</style>
