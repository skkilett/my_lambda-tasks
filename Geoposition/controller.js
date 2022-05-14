import GetLocationService from './service.js';

export default new class GetLocationController{
  async getLocation(req, res){
    // eslint-disable-next-line no-unused-vars
    const ip = GetLocationService.getIp(req,res);
    const ipNum = GetLocationService.IptoNum(ip);
    const locationObj = await GetLocationService.getCountryAndIp(ipNum);
    return locationObj;
  }
}; 

