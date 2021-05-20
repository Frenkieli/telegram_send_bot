let channelList = [];

JSON.parse(process.env.VUE_APP_CHANNELLIST).forEach((value, index) => {
  channelList.push(
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
    let index;
    switch (command) {
      case "addChannel":
        console.log("Bot join channel : " + data.title);
        this.channelList.push(data);
        break;
      case "deleteChannel":
        for (let i = 0; i < this.channelList.length; i++) {
          if (data.id === this.channelList[i].id) {
            index = i;
            console.log("Bot leave channel : " + data.title);
            break;
          }
        }
        this.channelList.splice(index, 1);
        break;
      case "modifyIndex":
        index = data.index;
        delete data.index;
        for (let key in data) {
          this.channelList[index][key] = data[key];
        }
        break;
      default:
        break;
    }
  }
}

let dataBus = new DataBus(channelList);

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

module.exports = {
  dataBus,
  ModifyData,
};
