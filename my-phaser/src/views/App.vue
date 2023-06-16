<template>
  <n-message-provider>
    <div class="loading" @click="prevent" v-if="loading.showLoading">
      <Loading :text="loading.loadingText" />
    </div>
    <router-view> </router-view>
  </n-message-provider>
</template>

<script setup lang="ts">
import Loading from "./Loading.vue";
import { useViewStore } from "~/store";
const { loading } = useViewStore();
function prevent(e) {
  e.stopPropagation();
}
</script>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  pointer-events: visibleFill;
}
</style>
