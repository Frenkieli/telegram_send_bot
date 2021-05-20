const fetch = require("node-fetch");
const { objectTransformToFormData } = require("./dataTransformHandler");
const { dataBus } = require("../models/dataBus");

const channelList = dataBus.getData("channelList");

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
function sendTelegramGroupMessage(rawData) {
  channelList.forEach((value) => {
    if (value.enable) {
      let data = objectTransformToFormData(
        Object.assign(
          {
            parse_mode: "HTML",
            chat_id: value.id,
          },
          rawData
        )
      );

      sendTelegramMessage(data);
    }
  });
}

module.exports = {
  sendTelegramMessage,
  sendTelegramGroupMessage,
};
