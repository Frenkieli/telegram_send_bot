const { parseDataToTelegram } = require("./dataTransformHandler");
const { sendTelegramGroupMessage } = require("./telegramHandler");
const { commandAssign } = require("./commandController/commandAssign");
const {
  botChatChangeHandler,
} = require("./receiverController/botChatChangeHandler");

/**
 * @description receive telegram data
 *
 * @param {*} req
 * @param {*} res
 */
function receiver(req, res) {
  let estringa = req.body;
  if (estringa.message && checkUserIdAndChartId(estringa.message.chat)) {
    if ("media_group_id" in estringa.message) {
      multitudeForwardHandler(estringa);
    } else {
      singleForwardHandler(estringa);
    }
  } else if (estringa.my_chat_member) {
    botChatChangeHandler.handler(estringa);
  }
  res.end();
}

/**
 * @description 確認正確用戶和正確頻道傳過來的
 *
 * @param {*} chatData
 * @return {*} 回傳布林值 true 是通過 false 是阻擋
 */
function checkUserIdAndChartId(chatData) {
  let chack = false;
  if (
    chatData.type === "private" &&
    (chatData.id === 1213797612 || // frenkie
    chatData.id === 937869921 || // roy
    chatData.id === 1214387140 || // 新來工讀生
      chatData.id === 1005157522) // 阿祥
  ) {
    chack = true;
    console.log("receive user " + chatData.id + " message");
  }
  return chack;
}

/**
 * @description define message type
 *
 * @param {*} message telegram message
 * @return {string} message, sticker, photo, video
 */
function checkTelegramMessageType(message) {
  let type;
  if (message.photo) {
    type = "photo";
  } else if (message.video) {
    type = "video";
  }
  return type;
}

/**
 * @description single message handler
 *
 * @param {*} estringa
 */
function singleForwardHandler(estringa) {
  var payload = parseDataToTelegram(estringa);
  if (payload?.method === "sendMessage") {
    let order = payload.text.split(" ")[0].slice(1, 10);
    commandAssign(payload, order, estringa.message.from.id);
  } else {
    sendTelegramGroupMessage(payload);
  }
}

let multitudeSendData = {};

/**
 * @description telegeam group message is multitude ajax so need to wait all message
 *
 * @param {*} estringa
 * @return {*}
 */
function multitudeForwardHandler(estringa) {
  let object = {
    type: checkTelegramMessageType(estringa.message),
    media:
      estringa.message.video?.file_id || estringa.message?.photo[1].file_id,
    caption: estringa.message.caption ? estringa.message.caption : "",
  };

  if (!multitudeSendData[estringa.message.media_group_id]) {
    multitudeSendData[estringa.message.media_group_id] = {
      timeout: null,
      data: [],
    };
  }
  multitudeSendData[estringa.message.media_group_id].data.push(object);

  clearTimeout(multitudeSendData[estringa.message.media_group_id].timeout);
  multitudeSendData[estringa.message.media_group_id].timeout = setTimeout(
    () => {
      sendTelegramGroupMessage({
        method: "sendMediaGroup",
        media: JSON.stringify(
          multitudeSendData[estringa.message.media_group_id].data
        ),
      });
    },
    1000
  );
}

module.exports = {
  receiver,
};
