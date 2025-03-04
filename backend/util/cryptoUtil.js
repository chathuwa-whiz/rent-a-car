import crypto from 'crypto';

const algorithm = 'aes-256-cbc'; 
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'default-secret', 'salt', 32);
const iv = crypto.randomBytes(16);

// Encrypt Data
const cryptoUtils = {
    encryptData: (text) => {
      try {
        // Ensure text is a string
        const textToEncrypt = String(text);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(textToEncrypt, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        // Store IV with encrypted data for decryption
        return iv.toString('hex') + ':' + encrypted;
      } catch (error) {
        console.error('Encryption error:', error);
        // Return original text if encryption fails
        return text;
      }
    },
  
    decryptData: (encryptedText) => {
      try {
        const textParts = encryptedText.split(':');
        if (textParts.length !== 2) return encryptedText;
        
        const storedIv = Buffer.from(textParts[0], 'hex');
        const decipher = crypto.createDecipheriv(algorithm, key, storedIv);
        let decrypted = decipher.update(textParts[1], 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
      } catch (error) {
        console.error('Decryption error:', error);
        return encryptedText;
      }
    }
  };

  export default cryptoUtils;