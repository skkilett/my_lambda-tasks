import GetLocationService from './service.js';

export default new class GetLocationController{
  async getLocation(req, res){
    // eslint-disable-next-line no-unused-vars
    const ip = GetLocationService.getIp(req,res);
    const ipNum = GetLocationService.IptoNum('83.229.33.3');
    const locationObj = await GetLocationService.getCountryAndIp(ipNum);
    return locationObj;
  }
}; 

