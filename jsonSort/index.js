
const fs = require("fs");
const axios = require("axios");
const list = fs.readFileSync("endpoints.txt", "utf8").split('\n');



async function requestFunc (reqLink) {
let noResFlag = 0;
while(noResFlag < 3){
  try {
    const res = await axios.get(reqLink)
    .then((response) => {
      if (typeof(response.data) == 'object') {
        noResFlag = 3;
      }
      return response.data;
      })
    return res;
    } catch (e) {
      noResFlag++;
    }
  }
}

async function findInTheObject(obj,val){
  if (typeof(obj) === 'object'){
    if (obj[val] != undefined)
    {
      return obj[val];
    }
    else{
      for (const i in obj) {
      const a = await findInTheObject(obj[i],val);
      if(a != null) return a;
      }
    }
  }
  return null;
}


(async function main(list){
  let trueValues = 0;
  let falseValues = 0;
  for (let i = 0; i < list.length; i++) {
    const currentUrl = list[i];
    const dataFromRequest = await requestFunc (currentUrl);
    let isDoneValue = 'noRes';
    if (dataFromRequest) {
      isDoneValue = await findInTheObject(dataFromRequest,'isDone');
    }
    if (!isDoneValue) {
      console.log(currentUrl);
      console.log('isDone - False');
      falseValues++;
    }
    else if(isDoneValue == true){
      console.log(currentUrl);
      console.log('isDone - True');
      trueValues++;
    }
    else {
      console.log(currentUrl);
      console.log('Error: No Response');
    }
    
  }
  console.log(`Значений True: ${trueValues}`);
  console.log(`Значений False: ${falseValues}`);
})(list);




