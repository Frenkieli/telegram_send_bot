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
    switch (command) {
      case "add":
        console.log("addCommand", data);
        break;
      case "modifyIndex":
        let index = data.index;
        delete data.index;
        for(let key in data) {
          this.channelList[index][key] = data[key];
        }
        break;
      default:
        break;
    }
  }
}

let dataBus = new DataBus(channelList);

module.exports = {
  dataBus,
};
