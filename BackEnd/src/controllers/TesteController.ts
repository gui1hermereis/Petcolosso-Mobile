import { Request, Response } from "express";
import CryptoJS from "crypto-js";

const TesteController = {
  test: async (request: Request, response: Response) => {
    let date = new Date();
    date.setHours(date.getHours() - 3);
    const KEY = process.env.API_KEY + ";" + date.toISOString().replace("Z", "");
    const parsedkey = CryptoJS.enc.Utf8.parse(process.env.API_SECRET);
    const iv = CryptoJS.enc.Utf8.parse(process.env.API_IV);
    const encrypted = CryptoJS.AES.encrypt(KEY, parsedkey, {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.NoPadding,
      format: CryptoJS.format.Hex,
    });
    return response.status(200).send(encrypted.toString());
  },
};
export { TesteController };
