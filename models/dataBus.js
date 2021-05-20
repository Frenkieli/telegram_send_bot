let channelList = new Map();

JSON.parse(process.env.VUE_APP_CHANNELLIST).forEach((value) => {
  channelList.set(
    value.id,
    Object.assign(
      {
        enable: false,
      },
      value
    )
  );
});
/**
 * @description cache data center
 *
 * @class DataBus
 */
class DataBus {
  constructor(channelList) {
    this.channelList = channelList;
  }

  /**
   * @description create instance
   *
   * @static
   * @param {*} channelList
   * @return {*} instance
   * @memberof DataBus
   */
  static getInstance(channelList) {
    if (!this.instance) {
      this.instance = new DataBus(channelList);
    }
    return this.instance;
  }

  /**
   * @description get cache data
   *
   * @param {string} type which data
   * @return {*} data
   * @memberof DataBus
   */
  getData(type) {
    let data;
    switch (type) {
      case "channelList":
        data = this.channelList;
        break;

      default:
        data = null;
        break;
    }
    return data;
  }

  /**
   * @description set cache data
   *
   * @param { string } type
   * @param { string } command
   * @param {*} data
   * @memberof DataBus
   */
  setData(type, command, data) {
    switch (type) {
      case "channelList":
        this.#setChannelList(command, data);
        break;

      default:
        break;
    }
  }

  /**
   * @description set channellist data
   * @param {string} command
   * @param {*} data
   * @private
   * @memberof DataBus
   */
  #setChannelList(command, data) {
    let channelKey;
    switch (command) {
      case "addChannel":
        if (!this.channelList.has(data.id)) {
          console.log("Bot join channel : " + data.title);
          this.channelList.set(data.id, data);
        }
        break;
      case "deleteChannel":
        if (this.channelList.has(data.id)) {
          console.log("Bot leave channel : " + data.title);
          this.channelList.delete(data.id);
        }
        break;
      case "modifyIndex":
        channelKey = data.key;
        delete data.key;
        let object = this.channelList.get(channelKey);
        this.channelList.set(channelKey, Object.assign(object, data));
        break;
      default:
        break;
    }
  }
}

/**
 * @description when class need to modify data
 *
 * @class ModifyData
 */
class ModifyData {
  /**
   * @description set data
   *
   * @param { string } command
   * @param {*} data
   * @memberof Command
   */
  setChannelList(command, data) {
    dataBus.setData("channelList", command, data);
  }
}

let dataBus = new DataBus(channelList);

module.exports = {
  dataBus,
  ModifyData,
};
