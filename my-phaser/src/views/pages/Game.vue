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
      <n-card title="help" style="width: 600px" class="my-help">
        <div><span class="info"> 游戏目标： </span> 找到9号房间通过传送点离开迷宫</div>
        <div>
          <span class="info">游戏介绍：</span>
          <ul style="margin-top: 0">
            <li>玩家拥有移动系统，背包管理系统，可以使用magicWater</li>
            <li>back指令可以回退到上一个房间,并且可以多次回退</li>
            <li>save指令可以保存当前状态到数据库中</li>
          </ul>
        </div>
        <div><span class="info"> 操作说明： </span></div>
        <ul style="margin-top: 0">
          <li>人物移动<code>方向键</code></li>
          <li>站在物品上,按<code>q</code>键拾取</li>
          <li>按<code>i</code>键打开背包</li>
          <li>
            背包界面中选择对应物品,<code>q</code>丢弃到当前房间,<code>e</code>使用物品
          </li>
        </ul>
      </n-card>
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
import { useMessage } from "naive-ui";
import { onMounted, ref, Ref } from "vue";
import Room from "~/data/Room";
import { startGame } from "~/game";
import Global from "~/scenes/Global";
import { saveArchive } from "~/service";
import { useViewStore } from "~/store";
interface RequstParams {
  name: string;
  date: string;
  playerData: string;
  history: string;
  currentRoom: number;
  rooms: Array<Room>;
}
const { startLoading, endLoading, setLoadingText, showBtns } = useViewStore();
const showModal = ref(false);
const showSave = ref(false);
const value = ref("存档" + Math.floor(Math.random() * 11000));
window.$message = useMessage();
const game: Ref<Phaser.Game> = ref(null);
const global: Ref<Global> = ref(null);
onMounted(async () => {
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
  let ans = global.value.dataManager.getSaveData();
  let newDate = new Date();
  console.log(JSON.stringify(ans.history));
  let requestParams: RequstParams = {
    name: value.value,
    currentRoom: ans.currentRoom.id,
    date: `${newDate.toDateString()} ${newDate.toTimeString().substring(0, 8)}`,
    history: JSON.stringify(ans.history),
    rooms: ans.rooms as any,
    playerData: JSON.stringify(global.value.playerData.getSaveData()),
  };
  saveArchive(requestParams);
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
.info {
  font-size: 16px;
  font-weight: bold;
}
</style>
