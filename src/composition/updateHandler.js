// import { ref } from 'vue';
require('dotenv').config()

function _getTelegramFileType(fileName, index, text) {
  let type;

  if (fileName.indexOf(".mp4") !== -1) {
    type = "video";
  } else {
    type = "photo";
  }

  let object = {
    type,
    media: "attach://files_" + index,
  };

  if (index === 0) {
    object.caption = text;
    object.parse_mode = "HTML";
  }
  return object;
}

export default function updateHandler() {
  function submitUpdateHandler(updataText, storageFiles, chartList, inlineButtonData) {
    let data = new FormData();
    let media = [];

    if (storageFiles.value.length === 0) {
      data.append("method", "sendMessage");
      data.append("text", updataText);
    } else if (storageFiles.value.length === 1) {
      let type = _getTelegramFileType(storageFiles.value[0].name).type;
      data.append("method", "send" + type);
      data.append(type, storageFiles.value[0]);
      data.append("caption", updataText);
    } else if (storageFiles.value.length <= 10) {
      data.append("method", "sendMediaGroup");
      for (let i = 0; i < storageFiles.value.length; i++) {
        data.append("files_" + i, storageFiles.value[i]);
        media.push(
          _getTelegramFileType(storageFiles.value[i].name, i, updataText)
        );
      }
      data.append("media", JSON.stringify(media));
    } else {
      console.log("檔案不可以超過10個");
      return;
    }

    data.append(
      "reply_markup",
      JSON.stringify({
        inline_keyboard: inlineButtonData,
        resize_keyboard: true,
        one_time_keyboard: false,
      })
    );

    chartList.forEach((value) => {
      data.delete("chat_id");
      data.append("chat_id", value.id);
      data.append("parse_mode", "HTML");

      fetch(        
        "https://api.telegram.org/bot" + process.env.VUE_APP_TOKEN + "/",
        {
          method: "post",
          body: data,
        }
      );
    });
  }

  return {
    submitUpdateHandler,
  };
}
