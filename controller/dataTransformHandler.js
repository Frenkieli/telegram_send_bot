const FormData = require("form-data");

/**
 * @description parse telegram message
 *
 * @param {*} estringa
 * @return {*} 
 */
function parseDataToTelegram(estringa) {
  var payload ={};
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
  }else if(estringa.message.animation) {
    animation = estringa.message.animation;
    payload = {
      method: "sendAnimation",
      animation: animation.file_id,
      caption: estringa.message.caption ? estringa.message.caption : "",
    };
  }
  payload.chat_id = estringa.message.chat.id;
  return payload;
}

/**
 * @description object to formdata
 *
 * @param {*} rawData
 * @return {*} FormData
 */
function objectTransformToFormData(rawData) {
  let data = new FormData();
  for (let key in rawData) {
    data.append(key, rawData[key]);
  }
  return data;
}

module.exports = {
  parseDataToTelegram,
  objectTransformToFormData,
};
