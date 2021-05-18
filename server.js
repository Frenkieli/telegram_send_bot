require('dotenv').config();
const http = require("http");
const fetch = require('node-fetch');
const FormData = require('form-data');

const hostName = "localhost";
const post = 3000;

const server = http.createServer((req, res) => {
  // we can access HTTP headers
  req.on("data", (chunk) => {
    let estringa = JSON.parse(chunk);
    // console.log(estringa);
    var payload = parseData(estringa);
    // console.log(payload);

    let url = "https://api.telegram.org/bot" + process.env.VUE_APP_TOKEN + "/";
    
    let channelList = JSON.parse(process.env.VUE_APP_CHANNELLIST);
    console.log(channelList, 'channelList');
    channelList.forEach(value => {
      let data = new FormData();
      for(let key in payload) {
        data.append(key, payload[key]);
      }
      data.append("parse_mode", "HTML");
      // data.delete("chat_id");
      data.append("chat_id", value.id);
      fetch(url, {
        "method": "post",
        "body": data,
      }).then(res=>res.json()).then(data=>{
      }).catch(e=>{
        console.log(e);
      });

    });

    // res.end(`chunk`);
  });
  req.on("end", () => {
    //end of data
    res.end(`<h1>This is my first server created by Node.js.</h1>`);
  });
  // res.statusCode = 200;
  // res.setHeader = ('content-Type', 'text/html');
  // res.end(`<h1>This is my first server created by Node.js.</h1>`);
});

server.listen(post, hostName, () => {
  console.log("伺服器打開囉");
});

function parseData(estringa) {
  var payload;

  if (estringa?.message?.text) {
    payload = {
      method: "sendMessage",
      text: estringa.message.text,
    };
  } else if (estringa?.message?.sticker) {
    payload = {
      method: "sendSticker",
      sticker: estringa.message.sticker.file_id,
    };
  }
  // 有caption
  else if (estringa?.message?.photo) {
    array = estringa.message.photo;
    text = array[1];
    payload = {
      method: "sendPhoto",
      photo: text.file_id,
      caption: estringa.message.caption,
      pinned_message: true,
    };
  } else if (estringa?.message?.video) {
    vidoe = estringa.message.video;
    payload = {
      method: "sendVideo",
      video: vidoe.file_id,
      caption: estringa.message.caption ? estringa.message.caption : '無',
      // pinned_message: true,
    };
  } else {
    payload = {
      method: "sendMessage",
      text: "Try other stuff",
    };
  }
  return payload;
}

let thumb = {
  file_id:
    "AAMCBQADGQEAAgLEYKI-scgYxjYAAZpy8Q1fK9DY216FAALoAgAC7dkZVYXveXv5evtz7B5cdHQAAwEAB20AA4RLAAIfBA",
  file_unique_id: "AQAD7B5cdHQAA4RLAAI",
  file_size: 10318,
  width: 320,
  height: 180,
};

let text = {
  update_id: 394237928,
  message: {
    message_id: 705,
    from: {
      id: 1213797612,
      is_bot: false,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      language_code: "zh-hans",
    },
    chat: {
      id: 1213797612,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      type: "private",
    },
    date: 1621245370,
    text: "xzlkvkls;aldf",
  },
};

let video = {
  update_id: 394237929,
  message: {
    message_id: 706,
    from: {
      id: 1213797612,
      is_bot: false,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      language_code: "zh-hans",
    },
    chat: {
      id: 1213797612,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      type: "private",
    },
    date: 1621245430,
    video: {
      duration: 15,
      width: 1920,
      height: 1080,
      file_name: "production ID_4485536 (1).mp4",
      mime_type: "video/mp4",
      thumb: [Object],
      file_id:
        "BAACAgUAAxkBAAICwmCiPfUhsgXdaEpk5EYhrlyhVaPJAALlAgAC7dkZVdhxqNw38Y_sHwQ",
      file_unique_id: "AgAD5QIAAu3ZGVU",
      file_size: 5837999,
    },
  },
};

let videoCaption = {
  update_id: 394237930,
  message: {
    message_id: 707,
    from: {
      id: 1213797612,
      is_bot: false,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      language_code: "zh-hans",
    },
    chat: {
      id: 1213797612,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      type: "private",
    },
    date: 1621245494,
    video: {
      duration: 15,
      width: 1920,
      height: 1080,
      file_name: "production ID_4485536 (1).mp4",
      mime_type: "video/mp4",
      thumb: [Object],
      file_id:
        "BAACAgUAAxkBAAICw2CiPjU7SiomGjMSp02Npa2rltp2AALmAgAC7dkZVWMBxs48BjidHwQ",
      file_unique_id: "AgAD5gIAAu3ZGVU",
      file_size: 5837999,
    },
    caption: "asdasd",
  },
};

let photoArrayData = {
  file_id:
    "AgACAgUAAxkBAAICyWCiP7JNJc6O3Lph_pWVqRGzlPPnAALTrDEb7dkZVcUgx7-J26rN56WucHQAAwEAAwIAA3kAA4j2AQABHwQ",
  file_unique_id: "AQAD56WucHQAA4j2AQAB",
  file_size: 24704,
  width: 960,
  height: 444,
}; // 大中小預覽圖類推

let photo = {
  update_id: 394237932,
  message: {
    message_id: 709,
    from: {
      id: 1213797612,
      is_bot: false,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      language_code: "zh-hans",
    },
    chat: {
      id: 1213797612,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      type: "private",
    },
    date: 1621245677,
    photo: [[Object], [Object], [Object]],
  },
};

let photoCaption = {
  update_id: 394237933,
  message: {
    message_id: 710,
    from: {
      id: 1213797612,
      is_bot: false,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      language_code: "zh-hans",
    },
    chat: {
      id: 1213797612,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      type: "private",
    },
    date: 1621245726,
    photo: [[Object], [Object], [Object]],
    caption: "dasd",
  },
};

// 兩個東西他會分兩次發過來
let groptItem1 = {
  update_id: 394237939,
  message: {
    message_id: 716,
    from: {
      id: 1213797612,
      is_bot: false,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      language_code: "zh-hans",
    },
    chat: {
      id: 1213797612,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      type: "private",
    },
    date: 1621246231,
    media_group_id: "12969969849926405",
    photo: [[Object], [Object], [Object]],
  },
};

let groptItem2 = {
  update_id: 394237940,
  message: {
    message_id: 717,
    from: {
      id: 1213797612,
      is_bot: false,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      language_code: "zh-hans",
    },
    chat: {
      id: 1213797612,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      type: "private",
    },
    date: 1621246231,
    media_group_id: "12969969849926405",
    video: {
      duration: 15,
      width: 1920,
      height: 1080,
      file_name: "production ID_4485536 (1).mp4",
      mime_type: "video/mp4",
      thumb: [Object],
      file_id:
        "BAACAgUAAxkBAAICzWCiQRcO31xDZDKk5K1pEmdsrNoBAALtAgAC7dkZVQRjbZPwFfThHwQ",
      file_unique_id: "AgAD7QIAAu3ZGVU",
      file_size: 5837999,
    },
  },
};

let groupItemCaption1 = {
  update_id: 394237941,
  message: {
    message_id: 718,
    from: {
      id: 1213797612,
      is_bot: false,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      language_code: "zh-hans",
    },
    chat: {
      id: 1213797612,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      type: "private",
    },
    date: 1621246396,
    media_group_id: "12969971170261125",
    photo: [[Object], [Object], [Object]],
    caption: "sdfsaf",
  },
};

let groupItemCaption2 = {
  update_id: 394237942,
  message: {
    message_id: 719,
    from: {
      id: 1213797612,
      is_bot: false,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      language_code: "zh-hans",
    },
    chat: {
      id: 1213797612,
      first_name: "驢",
      last_name: "子",
      username: "lyumage",
      type: "private",
    },
    date: 1621246396,
    media_group_id: "12969971170261125",
    video: {
      duration: 15,
      width: 1920,
      height: 1080,
      file_name: "production ID_4485536 (1).mp4",
      mime_type: "video/mp4",
      thumb: [Object],
      file_id:
        "BAACAgUAAxkBAAICz2CiQbyWctGjz18k_i3ehwXBAUO2AALuAgAC7dkZVX1Is68fMM19HwQ",
      file_unique_id: "AgAD7gIAAu3ZGVU",
      file_size: 5837999,
    },
  },
};
