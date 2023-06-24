import { defineStore } from "pinia";
import { reactive, Ref, ref } from "vue";
export const useViewStore = defineStore("view", () => {
  const loading = reactive({
    showLoading: false,
    loadingText: "正在加载中...",
  });

  const showBtns = reactive({
    show: false,
  });

  const archive = reactive({
    id: 27,
  });

  function startLoading() {
    loading.showLoading = true;
  }
  function endLoading() {
    loading.showLoading = false;
  }
  function setLoadingText(text: string) {
    loading.loadingText = text;
  }

  function toggleShowBtns() {
    console.log(showBtns);
    showBtns.show = true;
  }
  function notShowBtns() {
    showBtns.show = false;
  }

  function setArchiveID(id: number) {
    console.log(id);
    archive.id = id;
  }

  return {
    loading,
    startLoading,
    endLoading,
    setLoadingText,
    showBtns,
    toggleShowBtns,
    notShowBtns,
    archive,
    setArchiveID,
  };
});
