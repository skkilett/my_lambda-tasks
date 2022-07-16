import { Controller, Param, Body, Get, Post, Put, Delete, Req, Res } from 'routing-controllers';
import JSONValue from './types/json-type';
import LinkService from './service'

@Controller()
export class LinkController {
    
  @Get(/.*/)
  async getJsonByUrl(@Req() req: any, @Res() res: any): Promise<JSONValue> {
     return await LinkService.getDataFromBase(req, res);
  }
  
  @Post(/.*/)
  async JsonByUrl(@Req() req: any, @Res() res: any): Promise<void> {
    await LinkService.setDataToBase(req, res)
  }
}