<template>
  <n-card
    title="读取存档"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    class="my-card"
  >
    <template>
      <n-divider></n-divider>
    </template>
    <div class="mylist">
      <div v-for="(item, index) in archives" :key="item">
        <span
          style="
            padding: 5px;
            border-radius: 5px;
            background-color: #2080f0;
            color: white;
          "
        >
          {{ item.name }}
        </span>
        <span style="margin-left: 30px"
          >日期:
          <span style="margin-left: 10px">
            {{ item.date }}
          </span>
        </span>
        <n-button class="btn" type="info" @click="() => readArchive(item.id)"
          >读取</n-button
        >
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { getArchives } from "~/service";
import { useViewStore } from "../../../store/view";
const archives = ref([]);
const { startLoading, endLoading, setLoadingText } = useViewStore();
onMounted(async () => {
  const { data: ans } = await getArchives();
  archives.value = ans.data;
});
async function readArchive(id: number) {
  startLoading();
  setLoadingText("正在读取存档中");
  // const { archive } = useViewStore();
  // archive.id = id;
  localStorage.setItem("id", id.toString());
  setTimeout(() => {
    endLoading();
    window.open("#/game", "_blank");
  }, 2000);
}
</script>

<style scoped>
.my-card {
  min-width: 500px;
}

.my-card :deep() .n-card__content {
  padding-left: 20px;
  max-height: 400px;
  overflow: auto;
}

.my-card :deep() .n-card__content {
  --sb-track-color: #fff;
  --sb-thumb-color: #6baf8d;
  --sb-size: 10px;

  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
}

.my-card :deep() .n-card__content::-webkit-scrollbar {
  width: var(--sb-size);
}

.my-card :deep() .n-card__content::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 10px;
}

.my-card :deep() .n-card__content::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 10px;
}

.mylist > div {
  padding: 5px;
  height: 40px;
  border-radius: 3px;
  line-height: 40px;
  border: 1px solid rgb(208, 206, 206, 0.5);
  margin-bottom: 5px;
}
.mylist > div:hover {
  background-color: aqua;
}

.mylist > div {
  position: relative;
}
.btn {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  right: 20px;
}
</style>
