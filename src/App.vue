<template>
  <textarea
    v-model="updataText"
    id="updataText"
    class="updata_textarea"
    placeholder="請輸入文字"
    maxlength="4096"
  ></textarea>
  <div
    v-for="(array, key) in emojiList"
    :key="key"
    class="emoji_list"
    @click="addEmojs"
  >
    <div v-for="value in array" :key="value" class="emoji_list_icon">
      {{ value }}
    </div>
  </div>

  <div id="emojiListIcon" class="emoji_list"></div>
  <p>上傳檔案最多10個，全部檔案大小再50MB以下</p>
  <input
    type="file"
    name="updataFile"
    id="updataFile"
    class="updata_file"
    multiple
    accept=".jpg,.jpeg,.png,.gif,.mp4"
    @change="updataFileChange"
  />
  <div
    id="updataArea"
    class="updata_area"
    :class="{
      active: areaDropState,
    }"
    @dragenter.prevent="areaDragenterHandler"
    @dragover.prevent="() => {}"
    @dragleave.prevent="areaDragleaveHandler"
    @drop.prevent="areaDropHandler"
  >
    <div class="updata_area_border">
      <div class="updata_area_container">
        <label for="updataFile" class="updata_area_container_update"
          >上傳</label
        >
        或拖曳到這個區域
      </div>
    </div>
  </div>
  <button @click="submitUpdateData">發出</button>
</template>

<script>
import { ref } from "vue";

import dataCenter from "./composition/dataCenter";
import dropHandler from "./composition/dropHandler";
import filesHandler from "./composition/filesHandler";
import updateHandler from "./composition/updateHandler";

export default {
  name: "App",
  setup() {
    const updataText = ref(null);

    const { storageFiles, setStorageFiles } = filesHandler();
    const { emojiList, chartList } = dataCenter();
    const { submitUpdateHandler } = updateHandler();
    const { areaDropState, areaDragenterHandler, areaDragleaveHandler, areaDropHandler} = dropHandler(setStorageFiles);


    function updataFileChange(e) {
      let result = setStorageFiles(e.target.files);
      if (result.code === 0) {
        e.target.value = null;
      }
    }

    function submitUpdateData() {
      submitUpdateHandler(updataText.value, storageFiles, chartList);
    }

    function addEmojs(e) {
      updataText.value =
        (updataText.value ? updataText.value : "") + e.target.innerText;
    }

    return {
      updataText,
      updataFileChange,
      submitUpdateData,
      areaDropState,
      areaDragenterHandler,
      areaDragleaveHandler,
      areaDropHandler,
      emojiList,
      addEmojs,
    };
  },
};
</script>

<style lang="scss">
.updata_file {
  display: none;
}

.updata_area {
  width: 500px;
  height: 200px;
  border-radius: 20px;
  background-color: #a2ffff;
}

.updata_area.active {
  background-color: aqua;
}

.updata_area_border {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 5px dashed #00000066;
  display: flex;
  justify-content: center;
  align-items: center;
}

.updata_area.active .updata_area_border {
  border-color: #ffffff99;
}

.updata_area.active .updata_area_container {
  pointer-events: none;
}

.updata_area_container_update {
  cursor: pointer;
  padding: 2px;
  border: 1px solid #767676;
  background-color: #efefef;
}

.upload_zone_enter {
  border: 10px dashed black;
  background-clip: content-box;
}

.updata_textarea {
  /* 這個寬度是手機對話框和電腦介於中間的值 */
  width: 339px;
  height: 400px;
  resize: none;
  padding: 5px;
}

.emoji_list {
}

.emoji_list_icon {
  cursor: pointer;
  display: inline-block;
}
</style>
