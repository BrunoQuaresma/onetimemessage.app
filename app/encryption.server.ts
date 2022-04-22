import crypto from "crypto-js";

const encryptionKey = process.env.ENCRYPTION_KEY;

if (!encryptionKey) {
  throw new Error("ENCRYPTION_KEY not found");
}

export const encrypt = (message: string) => {
  return crypto.AES.encrypt(message, encryptionKey).toString();
};

export const decrypt = (message: string) => {
  return crypto.AES.decrypt(message, encryptionKey).toString(crypto.enc.Utf8);
};
