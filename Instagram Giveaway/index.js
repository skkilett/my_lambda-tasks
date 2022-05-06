const readline = require('node:readline');
const fs = require('fs');
const arr = [];



async function createArrofObjects() {
  for (let fileNumber = 0; fileNumber < 20; fileNumber++) {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(`../Instagram Giveaway/out${fileNumber}.txt`),
    }); 
      
    for await(const line of readInterface) {
      const index = arr.indexOf(arr.find((user) => user.name === line));
        if (index == -1) {
          arr.push({
            name: line,
            count: 1,
            num: fileNumber
          })
        }
        else{
          if (arr[index].num !== fileNumber) {
            arr[index].count++;
            arr[index].num == fileNumber
          }
        }
      }
  }
  return arr;
}


async function uniqueValues(){
  await createArrofObjects();
  console.log(arr.length);
}

async function existInAllFiles(){
  await createArrofObjects();
  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].count == 20) {
      counter++;
    }
  }
  console.log(counter);
}

async function existInAtLeastTen(){
  await createArrofObjects();
  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].count >= 10) {
      counter++;
    }
  }
  console.log(counter)
}


async function testFunc() {
  await createArrofObjects();
  let counterInAll = 0;
  let counterInAtLeastTen = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].count == 20) {
      counterInAll++;
    }
    if (arr[i].count >= 10) {
      counterInAtLeastTen++;
    }
  }
  console.log(`Amount of unique values = ${arr.length} `);
  console.log(`Amount of values that are present in 20  = ${counterInAll} `);
  console.log(`Amount of values that are present in at least 10  = ${counterInAtLeastTen} `);
}

testFunc();