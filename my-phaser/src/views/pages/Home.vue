<template>
  <div class="container">
    <div class="title">巨洞冒险</div>
    <img src="https://s1.ax1x.com/2023/06/15/pCK80bD.jpg" />
    <div class="state">
      <span v-if="isLogin">登录成功</span>
      <span v-else>未登录</span>
    </div>
    <div class="btns">
      <div v-if="isLogin">
        <n-button @click="openTheModal(2)" type="info">读取存档</n-button>
        <n-button @click="startNewGame" type="info">开始新的游戏</n-button>
        <n-button @click="logout" type="error">退出登录</n-button>
      </div>
      <div v-else>
        <n-button @click="openTheModal(0)" type="warning">登录</n-button>
        <n-button @click="openTheModal(1)" type="error">注册</n-button>
      </div>
    </div>
    <n-modal v-model:show="showModal">
      <div>
        <component @afterLogin="afterLogin" :is="nowComponent" />
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useMessage } from "naive-ui";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import LoadArchive from "./components/LoadArchive.vue";
import { useViewStore } from "../../store/view";
import { useRouter } from "vue-router";
const components = [Login, Register, LoadArchive];
window.$message = useMessage();
const { startLoading, endLoading, setLoadingText } = useViewStore();
const isLogin = ref(false);
const showModal = ref(false);
const router = useRouter();
const nowCompIndex = ref(0);
const nowComponent = computed(() => components[nowCompIndex.value]);
function openTheModal(index: number) {
  showModal.value = true;
  nowCompIndex.value = index;
}
function afterLogin() {
  showModal.value = false;
  setTimeout(() => {
    isLogin.value = true;
    window.$message.info("登录成功");
  }, 200);
}
function logout() {
  setLoadingText("正在退出中...");
  startLoading();
  setTimeout(() => {
    endLoading();
    isLogin.value = false;
    localStorage.clear();
    window.$message.info("退出成功");
  }, 2000);
}
function startNewGame() {
  startLoading();
  setLoadingText("正在创建新的游戏中");
  setTimeout(() => {
    endLoading();
    localStorage.setItem("id", "38");
    window.$message.info("创建成功");
    setTimeout(() => {
      window.open("#/game", "_blank");
    }, 500);
  }, 3000);
}
onMounted(() => {
  if (JSON.parse(localStorage.getItem("user"))) {
    window.$message.success("已登录");
    isLogin.value = true;
  } else {
    window.$message.warning("未登录");
  }
});
</script>

<style scoped>
.container {
  background-color: #121210;
  overflow: hidden;
}
.title {
  font-size: 60px;
  color: #fff;
  text-shadow: 0 0 5px #ff0200, 0 0 10px #727272;
  text-align: center;
  margin: 30rpx auto;

  position: absolute;
  top: 10%;
  width: 100%;
  z-index: 10;
}
img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 800px;
  height: auto;
}
.state {
  width: 100%;
  color: rgb(239, 19, 19);
  position: absolute;
  bottom: 18%;
  text-align: center;
}
.btns {
  width: 100%;
  position: absolute;
  bottom: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btns > div {
  display: flex;
  width: 400px;
  justify-content: space-between;
  align-items: center;
}

.card {
  width: auto;
}
</style>
