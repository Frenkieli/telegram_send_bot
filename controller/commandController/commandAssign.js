const { sendTelegramGroupMessage } = require("../telegramHandler");

const { listCommand } = require("./listCommand");
const { helpCommand } = require("./helpCommand");
const { enableCommand } = require("./enableCommand");

/**
 * @description command even assign
 *
 * @param {*} payload telegram data
 * @param {*} order e.g. /help => help
 * @param {*} user telegran user id
 */
function commandAssign(payload, order, user) {
  let data = {
    chat_id: user,
  };
  let connandList = {
    help: helpCommand.handler.bind(helpCommand),
    list: listCommand.handler.bind(listCommand),
    enable: enableCommand.handler.bind(enableCommand),
    disenable: enableCommand.handler.bind(enableCommand),
  };
  console.log(user, "user");
  console.log(payload, "payload");
  console.log(order, "order");
  if (connandList[order]) {
    connandList[order]({
      data,
      payload,
      enable: order === "enable",
    });
  } else {
    sendTelegramGroupMessage(payload);
  }
}

module.exports = {
  commandAssign,
};
