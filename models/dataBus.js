const { ModelDataHandler } = require('./dataModel');

/**
 * @description cache data center
 *
 * @class DataBus
 */
class DataBus {
  constructor() {
    this.channelList = new Map();
    this.administratorList = new Map();
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
   * @description databus install
   *
   * @memberof DataBus
   */
  async init() {
    let channelListResult = await ModelDataHandler.get('channelList');
    let administratorResult = await ModelDataHandler.get('administrator');
    if (channelListResult.code === 1) {
      for (let key in channelListResult.data) {
        this.channelList.set(
          Number(key),
          Object.assign(
            {
              enable: false,
            },
            channelListResult.data[key]
          )
        );
      }
    }
    if (administratorResult.code === 1) {
      for (let key in administratorResult.data) {
        this.administratorList.set(
          Number(key),
          Object.assign(
            {
              state: 0,
            },
            administratorResult.data[key]
          )
        );
      }
    }
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
      case "administratorList":
        data = this.administratorList;
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

      case "administratorList":
        this.#setAdministratorList(command, data);
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
    let vm = this;
    let channelKey;
    switch (command) {
      case "addChannel":
        if (!vm.channelList.has(data.id)) {
          console.log("Bot join channel : " + data.title);
          vm.channelList.set(data.id, data);
          ModelDataHandler.cteate('channelList', data);
        }
        break;
      case "deleteChannel":
        if (vm.channelList.has(data.id)) {
          console.log("Bot leave channel : " + data.title);

          vm.channelList.delete(data.id);
          ModelDataHandler.delete('channelList', { id: data.id });
        }
        break;
      case "modifyIndex":
        channelKey = data.key;
        delete data.key;
        let object = vm.channelList.get(channelKey);
        vm.channelList.set(channelKey, Object.assign(object, data));
        break;
      default:
        break;
    }
  }

  /**
   * @description set adminlist data
   * @param {string} command
   * @param {*} data
   * @private
   * @memberof DataBus
   */
  #setAdministratorList(command, data) {
    switch (command) {
      case "modifyEnable":
        let administratorListData = this.administratorList.get(data.chat_id);
        if (data.enable === true) {
          administratorListData.enableChannel[data.key] = true;
        } else {
          delete administratorListData.enableChannel[data.key];
        }
        ModelDataHandler.update('administrator', {
          id: administratorListData.id,
          enableChannel: administratorListData.enableChannel
        });
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


  /**
   * @description set data
   *
   * @param { string } command
   * @param {*} data
   * @memberof Command
   */
  setAdministratorList(command, data) {
    dataBus.setData("administratorList", command, data);
  }
}

let dataBus = new DataBus();

dataBus.init();

module.exports = {
  dataBus,
  ModifyData,
};
