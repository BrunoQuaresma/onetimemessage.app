import crypto from "crypto-js";

export const encrypt = (message: string, key: string) => {
  return crypto.AES.encrypt(message, key).toString();
};

export const decrypt = (message: string, key: string) => {
  return crypto.AES.decrypt(message, key).toString(crypto.enc.Utf8);
};
