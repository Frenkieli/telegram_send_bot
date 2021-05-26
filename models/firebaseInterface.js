/***
 * @description to handler connect firebase require
 * 
 * 
 * 
 */

const firebase = require('firebase');

firebase.initializeApp({
  projectId: process.env.PROJECTID,
});

var db = firebase.firestore();

console.log('firebase database connect success');

/**
 * @description firebase interface
 *
 * @class FirebaseController
 */
class FirebaseController {
  constructor() {
    this.firebase = db;
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


  /**
   * @description get database data
   *
   * @param { string } collection
   * @return { object } get data 
   * @memberof FirebaseController
   */
  get(collection) {
    return new Promise((resolve, reject) => {
      let data = {};
      let ref = db.collection(collection);
      ref.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          data[doc.id] = doc.data();
        });
        resolve(data);
      })
    })
  }

  /**
   * @description create data
   *
   * @param {string} collection collection name
   * @param {string} doc doc name
   * @param {*} data create data
   * @return {boolean} true 
   * @memberof FirebaseController
   */
  create(collection, doc, data) {
    return new Promise((resolve, reject) => {
      let ref = db.collection(collection).doc(doc);
      ref.set(data).then(() => {
        resolve(true);
      }).catch(() => {
        reject('create error');
      })
    })
  }

  /**
   * @description update data
   *
   * @param {string} collection collection name
   * @param {string} doc doc name
   * @param {*} data update data
   * @return {boolean} true 
   * @memberof FirebaseController
   */
  update(collection, doc, data) {
    return new Promise((resolve, reject) => {
      let ref = db.collection(collection).doc(doc);
      ref.update(data).then(() => {
        resolve(true);
        console.log('update succes')
      }).catch(() => {
        reject('update error');
      })
    })
  }

  /**
   * @description delete data
   *
   * @param {string} collection collection name
   * @param {string} doc doc name
   * @return {boolean} true 
   * @memberof FirebaseController
   */
  delete(collection, doc) {
    return new Promise((resolve, reject) => {
      let ref = db.collection(collection).doc(doc);
      ref.delete().then(() => {
        resolve(true);
        console.log('delete succes')
      }).catch(() => {
        reject('delete error');
      })
    })
  }

}

const firebaseController = FirebaseController.getInstance();


module.exports = {
  firebaseController
}