const { Command } = require("./commandFactory");

/**
 * @description return nothing
 *
 * @class HelpCommand
 * @extends {Command}
 */
class HelpCommand extends Command {
  /**
   * @description hander help list even
   *
   * @param {*} data
   * @memberof HelpCommand
   */
  handler({ data }) {
    let text = this.objectTransformToFormData(
      Object.assign(
        {
          method: "sendMessage",
          text: "都說明那麼多了還要幫助？？自己看！！",
        },
        data
      )
    );
    let sticker = this.objectTransformToFormData(
      Object.assign(
        {
          method: "sendSticker",
          sticker:
            "CAACAgIAAxkBAAIFNmCkgDbiIbn5DL6FeYLgqk3pW4vvAAIagQACns4LAAHvKISRTQSfBx8E",
        },
        data
      )
    );
    this.sendTelegramMessage(sticker);
    setTimeout(() => {
      this.sendTelegramMessage(text);
    }, 50);
  }
}

const helpCommand = HelpCommand.getInstance();

module.exports = {
  helpCommand,
};
