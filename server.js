require("dotenv").config();
const http = require("http");
const fetch = require("node-fetch");
const FormData = require("form-data");

const hostName = "localhost";
const post = 3000;



const server = http.createServer((req, res) => {
  // we can access HTTP headers
  req.on("data", (chunk) => {
    let estringa = JSON.parse(chunk);
    let channelList = JSON.parse(process.env.VUE_APP_CHANNELLIST);
    if (estringa.message && checkUserIdAndChartId(estringa.message.chat)) {
      if ("media_group_id" in estringa.message) {
        multitudeForwardHandler(estringa, channelList);
      } else {
        singleForwardHandler(estringa, channelList);
      }
    }
  });

  req.on("end", () => {
    //end of data
    res.end(`done`);
  });
});

server.listen(post, hostName, () => {
  console.log(hostName + ":" + post + " - On");
});

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
    (chatData.id === 1213797612 || chatData.id === 937869921)
  ) {
    chack = true;
    console.log("receive user " + chatData.id + " message");
  }
  return chack;
}

/**
 * @description send telegram massage function
 *
 * @param {*} data
 */
function sendTelegramMessage(data) {
  let url = "https://api.telegram.org/bot" + process.env.VUE_APP_TOKEN + "/";
  fetch(url, {
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Send Telegram:");
      console.log(data);
    })
    .catch((e) => {
      console.log("Server Error:");
      console.log(e);
    });
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

function parseData(estringa) {
  var payload;
  if (estringa.message.text) {
    payload = {
      method: "sendMessage",
      text: estringa.message.text,
    };
  } else if (estringa.message.sticker) {
    payload = {
      method: "sendSticker",
      sticker: estringa.message.sticker.file_id,
    };
  } else if (estringa.message.photo) {
    array = estringa.message.photo;
    text = array[1];
    payload = {
      method: "sendPhoto",
      photo: text.file_id,
      caption: estringa.message.caption ? estringa.message.caption : "",
    };
  } else if (estringa.message.video) {
    vidoe = estringa.message.video;
    payload = {
      method: "sendVideo",
      video: vidoe.file_id,
      caption: estringa.message.caption ? estringa.message.caption : "",
    };
  }
  return payload;
}

/**
 * @description single message handler
 *
 * @param {*} estringa
 * @param {*} channelList
 */
function singleForwardHandler(estringa, channelList) {
  var payload = parseData(estringa);
  // console.log(channelList, "channelList");
  console.log(payload, "payload");
  channelList.forEach((value) => {
    let data = new FormData();
    for (let key in payload) {
      data.append(key, payload[key]);
    }
    data.append("parse_mode", "HTML");
    // data.delete("chat_id");
    data.append("chat_id", value.id);
    sendTelegramMessage(data);
  });
}

let multitudeSendData = {};

/**
 * @description multitude message handler
 *
 * @param {*} estringa
 * @param {*} channelList
 * @return {*}
 */
function multitudeForwardHandler(estringa, channelList) {
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
      channelList.forEach((value) => {
        let data = new FormData();
        data.append("method", "sendMediaGroup");
        data.append(
          "media",
          JSON.stringify(
            multitudeSendData[estringa.message.media_group_id].data
          )
        );
        data.append("chat_id", value.id);
        sendTelegramMessage(data);
      });
    },
    1000
  );
}