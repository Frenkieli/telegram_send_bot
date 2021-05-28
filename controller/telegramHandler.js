const fetch = require("node-fetch");
const { objectTransformToFormData } = require("./dataTransformHandler");
const { dataBus } = require("../models/dataBus");

const administratorList = dataBus.getData("administratorList");

/**
 * @description send massage to telegram
 *
 * @param {FormData} data
 * @return {Promise} Promise
 */
function sendTelegramMessage(data) {
  const url = "https://api.telegram.org/bot" + process.env.VUE_APP_TOKEN + "/";

  fetch(url, {
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log("Send Telegram:");
      // console.log(data);
    })
    .catch((e) => {
      // console.log("Server Error:");
      // console.log(e);
    });
}

/**
 * @description send telegram Group massage function
 *
 * @param {object} rawData
 */
function sendTelegramGroupMessage(rawData, enableChannelList = null) {
  const enableChannel = enableChannelList || administratorList.get(rawData.chat_id).enableChannel;
  delete rawData.chat_id;
  for (let key in enableChannel) {
    let data = objectTransformToFormData(
      Object.assign(
        {
          parse_mode: "HTML",
          chat_id: Number(key),
        },
        rawData
      )
    );

    sendTelegramMessage(data);
  }
}

module.exports = {
  sendTelegramMessage,
  sendTelegramGroupMessage,
};
