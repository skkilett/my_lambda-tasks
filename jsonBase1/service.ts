import Link from "./models/models";
import JSONValue from "./types/json-type";
import {Request, Response } from 'express';
import { where } from "sequelize/types";

export default new class LinkService {
  async getDataFromBase(req: Request, res: Response): Promise<JSONValue> {
    const url: string = req.url;
    const linkData = await Link.findAll({
      where: {
        link : url
      }});
      return linkData[0].toJSON().json;
  }

  async createData(url: string, data: JSONValue): Promise<void> {
    await Link.create({link: url, json: data});
  }

  async updateData(url: string, data: JSONValue): Promise<void> {
    await Link.update({ json: data }, {
      where: {
        link: url
      }
    });
  }

  async setDataToBase(req: Request, res: Response): Promise<void> {
    const url: string = req.url;
    const data: JSONValue = req.body;
    const linkData = await Link.findAll({
      where: {
        link : url
      }});

      if (linkData.length !== 0) {
        this.updateData(url, data);

      }else {
        this.createData(url, data);

      }
  }
}