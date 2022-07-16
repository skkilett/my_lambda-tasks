"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./models/models"));
exports.default = new class LinkService {
    getDataFromBase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = req.url;
            const linkData = yield models_1.default.findAll({
                where: {
                    link: url
                }
            });
            return linkData[0].toJSON().json;
        });
    }
    createData(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.default.create({ link: url, json: data });
        });
    }
    updateData(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.default.update({ json: data }, {
                where: {
                    link: url
                }
            });
        });
    }
    setDataToBase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = req.url;
            const data = req.body;
            const linkData = yield models_1.default.findAll({
                where: {
                    link: url
                }
            });
            if (linkData.length !== 0) {
                this.updateData(url, data);
            }
            else {
                this.createData(url, data);
            }
        });
    }
};
