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

class FirebaseController{
  constructor(){
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

  create( collection, doc, data) {
    return new Promise((resolve, reject)=>{
      let ref = db.collection(collection).doc(doc);
      ref.set(data).then(res=>{
        console.log('create succes')
      })
    })
  }

  update() {
    ref.set({
      bad:15,
      eat:5,
      good: 666
    },{merge: true}).then(() => {
      console.log('set data successful');
    });
  }

}

const firebaseController = FirebaseController.getInstance();

firebaseController.create( 'test', 'test2', {
  gogo: 'gogogo'
})

module.exports = {
  firebaseController
}