const { Command } = require("./commandFactory");

const { listCommand } = require("./listCommand");

/**
 * @description enable channel
 *
 * @class EnableCommand
 * @extends {Command}
 */
class EnableCommand extends Command {
  /**
   * @description enable channel
   *
   * @param {*} { data, payload, enable }
   * @memberof EnableCommand
   */
  handler({ data, payload, enable }) {
    let inText = payload.text.split(" ");
    if (inText.length > 1 && inText[inText.length - 1])
      this.setChannelList("modifyIndex", {
        index: inText[inText.length - 1],
        enable: enable,
      });
    listCommand.handler({ data });
  }
}

const enableCommand = EnableCommand.getInstance();

module.exports = {
  enableCommand,
};
