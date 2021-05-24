

class ModelHandler {
  static administrator(data){
    
  }

  


}

function chackModelFormat( databaseName, data){
  let check = true;
  for(let key in data) {
    if(typeof data[key] !== databaseModels[databaseName][key]) check = false;
  }
  return check
}

module.exports = {

}

// database model 

const databaseModels = {
  administrator : {
    state: 'number', // 0 stand      - save on server
    id: 'number',
    title: 'string',
    enableChannel: 'array' // e.g. [ 2694156, 489456] save channel id
  },
  channelList: {
    id: 'number',
    title: 'string',
    type: 'stering'  // two type : group channel
  }
}
