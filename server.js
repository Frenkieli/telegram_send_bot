require("dotenv").config({
  path: '.env.local'
});
const http = require("http");
const fetch = require("node-fetch");
const FormData = require("form-data");

const hostName = "localhost";
const post = 3000;

let channelList = [];

JSON.parse(process.env.VUE_APP_CHANNELLIST).forEach((value, index) => {
  channelList.push(
    Object.assign(
      {
        enable: false,
      },
      value
    )
  );
});

const server = http.createServer((req, res) => {
  // we can access HTTP headers
  req.on("data", (chunk) => {
    let estringa = JSON.parse(chunk);
    // console.log(estringa);
    if (estringa.message && checkUserIdAndChartId(estringa.message.chat)) {
      if ("media_group_id" in estringa.message) {
        multitudeForwardHandler(estringa);
      } else {
        singleForwardHandler(estringa);
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
      let data = jsonTransformToFormData(
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

/**
 * @description transform data to formdata
 *
 * @param {*} rawData object
 * @return {FormData}
 */
function jsonTransformToFormData(rawData) {
  let data = new FormData();
  for (let key in rawData) {
    data.append(key, rawData[key]);
  }
  return data;
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
 */
function singleForwardHandler(estringa) {
  var payload = parseData(estringa);
  // console.log(channelList, "channelList");
  if (payload?.method === "sendMessage") {
    let order = payload.text.split(" ")[0].slice(1, 10);
    orderAssign(payload, order, estringa.message.from.id);
  } else {
    sendTelegramGroupMessage(payload);
  }
}

function orderAssign(payload, order, user) {
  let data = {
    chat_id: user,
  };
  let inText;
  console.log(user, "user");
  console.log(payload, "payload");
  console.log(order, "order");
  switch (order) {
    case "help":
      orderHelpHandler(data);
      break;
    case "enable":
      inText = payload.text.split(" ");
      if(inText[inText.length - 1]) channelList[inText[inText.length - 1]].enable = true;
      orderListHandler(data);
      break;
    case "disenable":
      inText = payload.text.split(" ");
      if(inText[inText.length - 1]) channelList[inText[inText.length - 1]].enable = false;
    case "list":
      orderListHandler(data);
      break;
    default:
      sendTelegramGroupMessage(payload);
      break;
  }
}

/**
 * @description help command handler
 *
 * @param {*} data
 */
function orderHelpHandler(data) {
  let text = jsonTransformToFormData(
    Object.assign(
      {
        method: "sendMessage",
        text: "都說明那麼多了還要幫助？？自己看！！",
      },
      data
    )
  );
  let sticker = jsonTransformToFormData(
    Object.assign(
      {
        method: "sendSticker",
        sticker:
          "CAACAgIAAxkBAAIFNmCkgDbiIbn5DL6FeYLgqk3pW4vvAAIagQACns4LAAHvKISRTQSfBx8E",
      },
      data
    )
  );
  sendTelegramMessage(sticker);
  setTimeout(() => {
    sendTelegramMessage(text);
  }, 50);
}

/**
 * @description handler list command
 *
 * @param {*} data
 */
function orderListHandler(data) {
  let enableChannelsList = [];
  let keyboardData = [];
  channelList.forEach((value, index) => {
    if (value.enable) {
      enableChannelsList.push(value.title);
      keyboardData.push([
        {
          text: "/disenable " + value.title + " " + index,
        },
      ]);
    } else {
      keyboardData.push([
        {
          text: "/enable " + value.title + " " + index,
        },
      ]);
    }
  });
  let text = jsonTransformToFormData(
    Object.assign(
      {
        method: "sendMessage",
        text: "=====目前發送頻道======\n" + enableChannelsList.join("\n"),
        reply_markup: JSON.stringify({
          keyboard: keyboardData,
          resize_keyboard: true,
          one_time_keyboard: false,
        }),
      },
      data
    )
  );
  sendTelegramMessage(text);
}

let multitudeSendData = {};

/**
 * @description multitude message handler
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
