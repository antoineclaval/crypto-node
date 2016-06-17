// Nodejs encryption with GCM
// Ref for GCM : http://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf
var crypto = require('crypto'),
  algorithm = 'aes-256-gcm',
  // key have to be 32 byte long
  key = 'rigeupeip5cie6ieloo2keifequohb2C',
  //If you use AES-256 with GCM , the IV size should be 96 bits large. Or 12 byte
  //Ref : http://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf
  iv =  crypto.randomBytes(12);

function encrypt(text) {
  var cipher = crypto.createCipheriv(algorithm, key, iv);
  var encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  var tag = cipher.getAuthTag();
  return {
    content: encrypted,
    tag: tag
  };
}

function decrypt(encrypted) {
  var decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(encrypted.tag);
  var dec = decipher.update(encrypted.content, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

var hw = encrypt("string to encrypt");
console.log(hw);
console.log(decrypt(hw));
