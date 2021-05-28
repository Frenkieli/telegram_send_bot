const { Command } = require("./commandFactory");

/**
 * @description list command class
 *
 * @class ListCommand
 * @extends {Command}
 */
class ListCommand extends Command {
  /**
   * @description hander list list even
   *
   * @param {*} data
   * @memberof ListCommand
   */
  handler({ data }) {
    let enableChannelsList = [];
    let keyboardData = [];
    this.channelList.forEach((value, index) => {
      if (this.administratorList.get(data.chat_id).enableChannel[value.id]) {
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
    let text = this.objectTransformToFormData(
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
    this.sendTelegramMessage(text);
  }
}

const listCommand = ListCommand.getInstance();

module.exports = {
  listCommand,
};
