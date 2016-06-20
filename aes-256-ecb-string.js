var crypto = require('crypto'),
	// Fun quirk. We have to specify a IV even if ECB is not using IV at all.
	// CreateCipher uses a password from which the key is derived 
	// (the IV is derived as well, but that is ignored for ECB). The createCipheriv method however directly uses a key as bytes
    iv = new Buffer(''),
    // 32 * 8 Char = 256 bytes for the key
    key = new Buffer('e6ee5c9847445e126008575068f1c4429ad34dbfcf7c675f6459c9a71919c0bc', 'hex'),
    cipher = crypto.createCipheriv('aes-256-ecb', key, iv),
    decipher = crypto.createDecipheriv('aes-256-ecb', key, iv),
    chunks = [];

var toEncrypt = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.";
var encryptedString = cipher.update( new Buffer(toEncrypt, 'utf8'),'buffer', 'hex');
encryptedString += cipher.final('hex');
console.log(toEncrypt,encryptedString);

var decryptedString = decipher.update( encryptedString,'hex', 'buffer');
decryptedString += decipher.final('hex');
console.log(encryptedString,decryptedString);