const { firebaseController } = require('./firebaseInterface');

/**
 * @description get data interdace
 *
 * @class ModelDataHandler
 */
class ModelDataHandler {

  /**
   * @description get database data
   *
   * @static
   * @param {string} collectionName
   * @return {*} array data
   * @memberof ModelDataHandler
   */
  static async get(collectionName) {
    let result = await firebaseController.get(collectionName);
    for (let key in result) {
      chackModelFormat(collectionName, result[key]);
    }
    return {
      code: 1,
      data: result
    };
  }

  /**
   * @description create data
   *
   * @static
   * @param {string} collectionName
   * @param {*} data
   * @return {*} boolean
   * @memberof ModelDataHandler
   */
  static cteate(collectionName, data) {
    return new Promise(async (resolve) => {
      if (!chackModelFormat(collectionName, data)) {
        resolve({
          code: 0
        })
      } else {
        firebaseController.create(collectionName, String(data.id), data)
          .then(() => {
            resolve({
              code: 1,
            })
          }).catch(() => {
            resolve({
              code: 0,
            });
          });
      }
    })
  }

  /**
   * @description updatedata data
   *
   * @static
   * @param {string} collectionName
   * @param {*} data
   * @return {*} boolean
   * @memberof ModelDataHandler
   */
  static update(collectionName, data) {
    return new Promise(async (resolve) => {
      if (!chackModelFormat(collectionName, data, 1)) {
        resolve({
          code: 0
        })
      } else {
        firebaseController.update(collectionName, String(data.id), data)
          .then(() => {
            resolve({
              code: 1
            })
          }).catch(() => {
            resolve({
              code: 0
            })
          });
      }
    });
  }



  /**
   * @description delete data
   *
   * @static
   * @param {string} collectionName
   * @param {*} data
   * @return {*} boolean
   * @memberof ModelDataHandler
   */
  static async delete(collectionName, data) {
    return new Promise((resolve, reject) => {
      if (!chackModelFormat(collectionName, data, 1)) {
        resolve({
          code: 0
        })
      } else {
        firebaseController.delete(collectionName, String(data.id));
        resolve({
          code: 1
        })
      }
    })
  }

}

/**
 * @description to verify data type
 *
 * @param { string } databaseName database name
 * @param { object } data data
 * @param { number } [verifyType=0] 0 databaseModels check data 1 data check databaseModels
 * @return {boolean} true or false 
 */
function chackModelFormat(databaseName, data, verifyType = 0) {

  let check = true;
  let verifyData = verifyType ? data : databaseModels[databaseName];
  for (let key in verifyData) {
    if (typeof data[key] !== databaseModels[databaseName][key]) {
      check = false
      console.log('collection data ' + key + ' type verify error.');
    };
  }
  return check
}

// (async () => {
// console.log(await ModelDataHandler.get('channelList'), 'getdata');
// console.log(await ModelDataHandler.cteate('channelList', {
//   id: 45312,
//   title: 'bbb',
//   type: 'channel'
// }));
// setTimeout(async () => {
//   console.log(await ModelDataHandler.update('channelList', {
//     id: 45312,
//     title: 'gogogo'
//   }));
// }, 1000);
// setTimeout(async () => {
//   console.log(await ModelDataHandler.delete('channelList', {
//     id: 45312,
//   }));
// }, 2000);
// })();

module.exports = {
  ModelDataHandler
}

// database model 
/**
 * @description database model
 */
const databaseModels = {
  administrator: {
    // state: 'number', // 0 stand      - save on server
    id: 'number',
    title: 'string',
    enableChannel: 'object' // e.g. {2694156 : true, 489456 : true } save channel id
  },
  channelList: {
    id: 'number',
    title: 'string',
    type: 'string'  // two type : group channel
  }
}
