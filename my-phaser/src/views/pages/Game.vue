<template>
  <div style="overflow: hidden">
    <div class="btns" v-if="showBtns.show">
      <n-space :size="80" class="btns-space">
        <n-button type="info" @click="back">back</n-button>
        <n-button type="info" @click="save">save</n-button>
        <n-button type="info" @click="help">help</n-button>
      </n-space>
    </div>
    <n-modal v-model:show="showModal">
      <n-card title="help" style="width: 600px" class="my-help"> </n-card>
    </n-modal>
    <n-modal v-model:show="showSave">
      <n-card title="save" style="width: 600px" class="my-save">
        <n-space :size="20" vertical>
          <div>输入名称:<n-input v-model:value="value"></n-input></div>
          <div>保存日期：<br />{{ new Date().toString() }}</div>
          <div>
            <n-button type="info" @click="send">保存</n-button>
          </div>
        </n-space>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { startGame } from "~/game";
import { useMessage } from "naive-ui";
import { useViewStore } from "~/store";
import Global from "~/scenes/Global";
const { startLoading, endLoading, setLoadingText, showBtns } = useViewStore();
const showModal = ref(false);
const showSave = ref(false);
const value = ref("存档" + Math.floor(Math.random() * 11000));
window.$message = useMessage();
const game: Ref<Phaser.Game> = ref(null);
const global: Ref<Global> = ref(null);
onMounted(async () => {
  //是否加载存档
  let theGame = await startGame();
  game.value = theGame;
  global.value = theGame.scene.scenes[0] as Global;
});
function back() {
  let ans = global.value.dataManager.back();
  if (ans.isOk) {
    global.value.playerData.setNewPosition({
      x: ans.x,
      y: ans.y,
    });
    game.value.scene.start("BaseScene");
    window.$message.info("回到上一个房间");
  } else {
    window.$message.error("已经回到第一个房间了");
  }
}
function save() {
  //保存到数据库总
  showSave.value = true;
}
function send() {
  setLoadingText("正在保存中...");
  startLoading();
  console.log(JSON.stringify(global.value.playerData.getSaveData()));
  console.log(global.value.dataManager.getSaveData());
  setTimeout(() => {
    window.$message.success("保存成功");
    endLoading();
    showSave.value = false;
  }, 2000);
}
function help() {
  showModal.value = true;
}
</script>

<style scope>
.btns {
  position: absolute;
  bottom: 10%;
  width: 100%;
  left: 0;
  right: 0;
  margin: auto;
}
.btns-space {
  justify-content: center !important;
}
.my-help {
  min-height: 300px;
}
.my-save > div {
  height: 40px;
  margin-bottom: 10px;
}
</style>
