<template>
  <div class="ai-corner" @click="go">
    <span class="ai-corner-text">{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const props = defineProps<{
  route: string;
  text: string;
}>();

const router = useRouter();
const go = () => {
  router.push(props.route);
};
</script>

<style lang="sass" scoped>
.ai-corner
  position: fixed
  top: 0
  left: 0
  width: 68px
  height: 68px
  background: linear-gradient(135deg, #2d8a4e, #4caf50)
  clip-path: polygon(0 0, 100% 0, 0 100%)
  cursor: pointer
  z-index: 999
  transition: all 0.3s ease

  &:hover
    width: 76px
    height: 76px
    filter: brightness(1.1)

.ai-corner-text
  position: absolute
  top: 8px
  left: 8px
  font-size: 18px
  font-weight: 800
  color: white
  user-select: none
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2)
</style>
