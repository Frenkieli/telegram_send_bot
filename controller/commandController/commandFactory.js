const {
  sendTelegramMessage,
  sendTelegramGroupMessage,
} = require("../telegramHandler");
const { objectTransformToFormData } = require("../dataTransformHandler");

const { dataBus } = require("../../models/dataBus");

const channelList = dataBus.getData("channelList");

/**
 * @description base command class
 *
 * @class Command
 */
class Command {
  constructor() {
    this.objectTransformToFormData = objectTransformToFormData;
    this.sendTelegramMessage = sendTelegramMessage;
    this.sendTelegramGroupMessage = sendTelegramGroupMessage;
    this.channelList = channelList;
  }

  /**
   * @description create instance
   *
   * @static
   * @return {*} instance
   * @memberof Command
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  /**
   * @description set channel List
   *
   * @param { string } command
   * @param {*} data
   * @memberof Command
   */
  setChannelList(command, data) {
    dataBus.setData("channelList", command, data);
  }
}

module.exports = {
  Command,
};
