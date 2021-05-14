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

  <transition name="fade">
    <div
      v-show="editInlineButton"
      class="telegram_inlinebotton_edit"
      @click="
        () => {
          editInlineButton = null;
        }
      "
    >
      <div class="telegram_inlinebotton_edit_card" @click.stop="() => {}">
        <div class="telegram_inlinebotton_edit_card_header">設定inline選項</div>
        <div class="telegram_inlinebotton_edit_card_body">
          <div class="telegram_inlinebotton_edit_card_body_input">
            文字: <input v-model="editInlineButtonData.text" />
          </div>
          <div class="telegram_inlinebotton_edit_card_body_input">
            連結: <input v-model="editInlineButtonData.url" />
          </div>
        </div>
        <div class="telegram_inlinebotton_edit_card_footer">
          <div
            class="telegram_inlinebotton_edit_card_footer_btn"
            @click="
              () => {
                editInlineButton = null;
              }
            "
          >
            取消
          </div>
          <div
            class="telegram_inlinebotton_edit_card_footer_btn"
            @click="deleteCol"
          >
            刪除
          </div>
        </div>
      </div>
    </div>
  </transition>
  <div class="telegram_inlinebotton_container">
    <div
      v-for="(buttonArray, rowIndex) in inlineButtonData"
      :key="'inlineRow_' + rowIndex"
      class="telegram_inlinebotton_container_row"
    >
      <div
        v-for="(data, colIndex) in buttonArray"
        :key="data.text + colIndex"
        class="telegram_inlinebotton_container_row_col"
        @click="
          () => {
            editInlineButton = [rowIndex, colIndex];
            editInlineButtonData = inlineButtonData[rowIndex][colIndex];
          }
        "
      >
        {{ data.text }}
      </div>
      <div
        class="telegram_inlinebotton_container_row_col option"
        @click="
          () => {
            addCol(rowIndex);
          }
        "
      >
        新增列
      </div>
      <div
        @click="
          () => {
            deleteRow(rowIndex);
          }
        "
        class="telegram_inlinebotton_container_row_col option"
      >
        刪除行
      </div>
    </div>
    <div class="telegram_inlinebotton_container_row option" @click="addRol">
      新增行
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
  <div class="pick_chart">
    <div
      class="pick_chart_option"
      v-for="data in chartList"
      :key="data.title"
    >
      <input 
        :id="data.title"
        :value="data"
        type="checkbox" 
        v-model="pickChart"
      />
      <label
        :for="data.title"
      >
        {{ data.title }}
      </label>
    </div>
  </div>
  <button
    style="cursor: pointer;"
    @click="submitUpdateData"
  >發出</button>
</template>

<script>
import dataCenter from "./composition/dataCenter";
import inputDataHandler from "./composition/inputDataHandler";
import dropHandler from "./composition/dropHandler";
import filesHandler from "./composition/filesHandler";
import updateHandler from "./composition/updateHandler";

export default {
  name: "App",
  setup() {
    const { emojiList, chartList } = dataCenter();
    const {
      pickChart,
      updataText,
      editInlineButton,
      editInlineButtonData,
      inlineButtonData,
      addRol,
      deleteRow,
      addCol,
      deleteCol,
    } = inputDataHandler();
    const { storageFiles, setStorageFiles, updataFileChange } = filesHandler();
    const { submitUpdateHandler } = updateHandler();
    const {
      areaDropState,
      areaDragenterHandler,
      areaDragleaveHandler,
      areaDropHandler,
    } = dropHandler(setStorageFiles);

    function submitUpdateData() {
      submitUpdateHandler(
        updataText.value,
        storageFiles,
        pickChart.value,
        inlineButtonData.value
      );
    }

    function addEmojs(e) {
      updataText.value =
        (updataText.value ? updataText.value : "") + e.target.innerText;
    }

    return {
      pickChart,
      chartList,
      updataText,
      inlineButtonData,
      updataFileChange,
      submitUpdateData,
      areaDropState,
      areaDragenterHandler,
      areaDragleaveHandler,
      areaDropHandler,
      emojiList,
      addEmojs,
      editInlineButton,
      editInlineButtonData,
      addRol,
      deleteRow,
      addCol,
      deleteCol,
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
  display: inline-block;
}

.emoji_list_icon {
  cursor: pointer;
  display: inline-block;
}

.telegram_inlinebotton_container {
  width: 529px;
  text-align: center;
  &_row {
    cursor: pointer;
    display: flex;
    &_col {
      position: relative;
      flex-grow: 1;
      border: 1px solid #000;
      &.option {
        flex-grow: 0;
        width: 87px;
      }
    }
    &.option {
      justify-content: center;
      flex-grow: 0;
      width: 351px;
      box-sizing: border-box;
      border: 1px solid #000;
    }
  }
}

.telegram_inlinebotton_edit {
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000066;
  &_card {
    padding: 10px;
    background-color: #fff;
    &_header {
    }
    &_body {
      &_input {
      }
    }
    &_footer {
      display: flex;
      justify-content: space-between;
      &_btn {
        cursor: pointer;
      }
    }
  }
}

.pick_chart_option *{
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
