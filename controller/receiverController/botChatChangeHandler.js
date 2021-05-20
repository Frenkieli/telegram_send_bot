const { ModifyData } = require("../../models/dataBus");

class BotChatChangeHandler extends ModifyData {
  constructor() {
    super();
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

  handler(estringa) {
    const my_chat_member = estringa.my_chat_member;
    // console.log(my_chat_member);
    if (
      my_chat_member.new_chat_member.status === "member" &&
      my_chat_member.old_chat_member.status === "left"
    ) {
      this.setChannelList("addChannel", my_chat_member.chat);
    } else if (
      my_chat_member.new_chat_member.status === "left" &&
      my_chat_member.old_chat_member.status === "member"
    ) {
      this.setChannelList("deleteChannel", my_chat_member.chat);
    }
  }
}

const botChatChangeHandler = BotChatChangeHandler.getInstance();

module.exports = {
  botChatChangeHandler,
};
