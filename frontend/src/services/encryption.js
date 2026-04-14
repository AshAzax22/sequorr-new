import CryptoJS from 'crypto-js';

// In an enterprise app, this key would be derived directly from the user's plain-text password using HKDF 
// before letting the password touch the backend. For this local demo, we keep it static.
const SECRET_KEY = "calmiq_local_e2ee_secure_key"; 

export const encryptText = (text) => {
    if (!text) return "";
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptText = (ciphertext) => {
    if (!ciphertext) return "";
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (err) {
        console.error("Decryption failed:", err);
        return "ERROR_DECRYPTING";
    }
};
