const {
  sendTelegramMessage,
  sendTelegramGroupMessage,
} = require("../telegramHandler");
const { objectTransformToFormData } = require("../dataTransformHandler");

const { dataBus, ModifyData } = require("../../models/dataBus");

const channelList = dataBus.getData("channelList");

/**
 * @description base command class
 *
 * @class Command
 */
class Command extends ModifyData {
  constructor() {
    super();
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
}

module.exports = {
  Command,
};
