import crypto from 'crypto';

const algorithm = 'aes-256-gcm'; // Changed from aes-256-cbc to aes-256-gcm
const salt = crypto.randomBytes(16); // Randomly generated salt
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex'), salt , 32);

// Encrypt Data
const cryptoUtils = {
    encryptData: (text) => {
      try {
        // Generate a new IV for each encryption (security best practice)
        const iv = crypto.randomBytes(16);
        
        // Ensure text is a string
        const textToEncrypt = String(text);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(textToEncrypt, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        // Get authentication tag (GCM specific)
        const authTag = cipher.getAuthTag().toString('hex');
        
        // Store IV, encrypted data, and auth tag
        return iv.toString('hex') + ':' + encrypted + ':' + authTag;
      } catch (error) {
        console.error('Encryption error:', error);
        // Return original text if encryption fails
        return text;
      }
    },
  
    decryptData: (encryptedText) => {
      try {
        const textParts = encryptedText.split(':');
        if (textParts.length !== 3) return encryptedText; // Now expecting 3 parts
        
        const storedIv = Buffer.from(textParts[0], 'hex');
        const encryptedData = textParts[1];
        const authTag = Buffer.from(textParts[2], 'hex');
        
        const decipher = crypto.createDecipheriv(algorithm, key, storedIv);
        // Set auth tag before decryption (GCM specific)
        decipher.setAuthTag(authTag);
        
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
      } catch (error) {
        console.error('Decryption error:', error);
        return encryptedText;
      }
    }
  };

  export default cryptoUtils;