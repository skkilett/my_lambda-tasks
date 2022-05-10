const readline = require('node:readline');
const fs = require('fs');
const map = new Map();


async function createArrofObjects() {
  for (let fileNumber = 0; fileNumber < 20; fileNumber++) {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(`../Instagram Giveaway/out${fileNumber}.txt`),
    }); 
      
    for await(const line of readInterface) {
      if (map.has(line))
      {
        element = map.get(line)
        if (element.num !== fileNumber)
        {
          element.count++;
          element.num = fileNumber;
        }
      }
      else
      {
        map.set(line, {
            count: 1,
            num: fileNumber
          });
      }
    }
  }
  return map;
}


async function uniqueValues(map){
  return map.size;
}

async function existInAllFiles(map){
  let counter = 0;
  for (let val of map.values()) {
    if (val.count == 20) {
      counter++;
    }
  }
  return counter;
}



async function existInAtLeastTen(map){
  let counter = 0;
  for (let val of map.values()) {
    if (val.count >= 10) {
      counter++;
    }
  }
  return counter;
}


(async function testFunc() {
  const map = await createArrofObjects();

  console.log(`Amount of unique values = ${await uniqueValues(map)} `);
  console.log(`Amount of values that are present in 20  = ${await existInAllFiles(map)} `);
  console.log(`Amount of values that are present in at least 10  = ${await existInAtLeastTen(map)} `);
})()
