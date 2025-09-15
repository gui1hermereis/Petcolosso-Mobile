import * as bcrypt from "bcrypt";
import jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";
import { Users } from "./types";

export const getUserId = (auth: string) => jwtDecode<Users>(auth.replace("Bearer ", "")).id;
export const getUserName = (auth: string) => jwtDecode<Users>(auth.replace("Bearer ", "")).username;
export const getTokenEmail = () => Math.random().toString(36).slice(2).substring(2, 6).toUpperCase();

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

export const getUser = (auth: string) => {
    try {
        const decoded = jwtDecode<Users>(auth);
        const { ...otheProps } = decoded;
        const user: Users = { ...otheProps };
        return user;
    } catch { }
};