var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    key = 'aAesKeyThatShouldStayPrivate';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,key);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,key);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}
 
var hw = encrypt("string to encrypt");
console.log(decrypt(hw));