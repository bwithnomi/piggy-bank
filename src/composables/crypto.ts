import CryptoJS from "crypto-js";

export const createCipher = (string: string): string => {
  let ciphertext = CryptoJS.AES.encrypt(string, import.meta.env.VITE_AES_KEY).toString();
  return ciphertext;
}

export const decryptCipher = (string: string): string | null => {
  try {
    var bytes  = CryptoJS.AES.decrypt(string, import.meta.env.VITE_AES_KEY);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext
  } catch (error) {
    return null;
  }
}