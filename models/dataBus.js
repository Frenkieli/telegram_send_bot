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
class DataBus {
  constructor(channelList) {
    this.channelList = channelList;
  }

  static getInstance(channelList) {
    if (!this.instance) {
      this.instance = new DataBus(channelList);
    }
    return this.instance;
  }

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

  setData(type, command, data) {
    switch (type) {
      case "channelList":
        this.#setChannelList(command, data);
        break;

      default:
        break;
    }
  }

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
