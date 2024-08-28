import * as bcrypt from "bcrypt";
import jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";
import { User } from "./types";

export const Encrypt = {
  cryptPassword: (password: string) =>
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => hash),

  comparePassword: (password: string, hashPassword: string) => bcrypt.compare(password, hashPassword).then((resp) => resp),

  cryptUser: (user: string) =>
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(user, salt))
      .then((hash) => hash),

  compareUser: (user: string, hashUser: string) => bcrypt.compare(user, hashUser).then((resp) => resp),
};
export const getUserId = (auth: string) => jwtDecode<User>(auth.replace("Bearer ", "")).id;
export const getUserName = (auth: string) => jwtDecode<User>(auth.replace("Bearer ", "")).username;
export const getTokenEmail = () => Math.random().toString(36).slice(2).substring(2, 6).toUpperCase();
export const dateBrToEua = (stringDate: string) => {
  if (stringDate === null || stringDate === undefined || stringDate === "") return "";
  let result = "";
  let strings = stringDate.split("/");
  result += strings[2];
  result += "-";
  result += strings[1];
  result += "-";
  result += strings[0];
  return result;
};

export const parseBool = (value?: any) => {
  if (value !== undefined && value === "true") {
    return true;
  } else if (value === undefined || value === "false") {
    return false;
  }
  return undefined;
}
//ENTRADA: Date => Mon Jan 01 2001 00:00:00 GMT-0200 (Horário de Verão de Brasília)
//SAIDA: 2001-01-01
export const dateToString = (date: Date) => {
  if (date === undefined || date === null) return "";
  let result = "";
  result += date.getFullYear();
  result += "-";
  result += (date.getMonth() + 1).toString().padStart(2, "0");
  result += "-";
  result += date.getDate().toString().padStart(2, "0");
  return result;
};
//ENTRADA: 2001-01-01
//SAIDA: Date => Mon Jan 01 2001 00:00:00 GMT-0200 (Horário de Verão de Brasília)
export const stringToDate = (dateStr: string) => {
  if (dateStr === undefined || dateStr === null || dateStr === "") return undefined;
  const splited = dateStr.split("-");
  const result = new Date(parseInt(splited[0]), parseInt(splited[1]) - 1, parseInt(splited[2]));
  return result;
};
export const generateKey = () => {
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
  return encrypted.toString();
};

export const getUser = (auth: string) => {
  try {
    const decoded = jwtDecode<User>(auth);
    const { ...otheProps } = decoded;
    const user: User = { ...otheProps };
    return user;
  } catch { }
};

export const hasAcessModule = (usuario: User, modulo: string) => {
  if (usuario.isAdm) return true;
  return usuario;
};

export const isNumeric = (str) => {
  var er = /^[0-9]+$/;
  return er.test(str);
};
