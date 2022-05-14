import * as fs from 'fs';
import * as readline from 'node:readline';
import path from 'path';
const __dirname = path.resolve();



export default new class GetLocationService{
  arrFromCsv = [];

  constructor() {
    this.startFunc()
  }

  async startFunc(){
    await this.readFileIntoArray();
    console.log('File has been read');
  }

  getIp(req){
    return req.ip;
  }

  numToIp(num){
    return ( (num>>>24) +'.' +
        (num>>16 & 255) +'.' +
        (num>>8 & 255) +'.' +
        (num & 255) );
  } 
    
  IptoNum(ip){
    let res = 0;  
    const numArr = ip.split('.').reverse();
    for (let i = 3; i >= 0; i--) {
      res += numArr[i] * 256**i;
    }
    return res;
  }


  async getCountryAndIp (ip){
    const locatinWithNumIp = {}
    Object.assign(locatinWithNumIp, this.binarySearch(this.arrFromCsv, ip, 0, this.arrFromCsv.length));
    locatinWithNumIp.lowerBound = this.numToIp(locatinWithNumIp.lowerBound);
    locatinWithNumIp.upperBound = this.numToIp(locatinWithNumIp.upperBound);
    return locatinWithNumIp;
  }

  binarySearch(data, target, start, end){
      
      if(end < 1) return data[0];
      const middle = Math.floor((start + (end - start)/2));
      if (target === data[middle].upperBound) return data[middle];
      if (end - 1 === start) return data[end]; 
      if (target > data[middle].upperBound) return this.binarySearch(data,target,middle,end);
      if (target < data[middle].upperBound) return this.binarySearch(data,target,start,middle);
  }
  

  async readFileIntoArray(){
    const readInterface = readline.createInterface({
      input: fs.createReadStream(path.resolve(__dirname, 'data.csv'))
  }); 
      
  readInterface
      .on('line', (input) => {
        const [lowerBound, upperBound, ...country] = input.split(',');
        const unquote = str => str.replace(/^"(.*)"$/, '$1');
        this.arrFromCsv.push({
          lowerBound: unquote(lowerBound),
          upperBound: unquote(upperBound),
          country: country.map((el) => unquote(el))
        })
      })
  }
}

