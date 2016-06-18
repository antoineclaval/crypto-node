var crypto = require('crypto'),
    _ = require('underscore'),
    algorithm = process.argv[2],
    key = 'e6ee5c9847445e126008575068f1c4429ad34dbfcf7c675f6459c9a71919c0bc',
    mode = process.argv[3],
    outputEncoding = process.argv[4];


var supportedAESmode = ['aes-256-ctr','aes-256-ecb', 'aes-256-cbc', 'aes-256-cfb', 'aes-256-ofb' ];
var supportedOutputEncoding = ['hex', 'binary', 'base64'];

if ( process.argv.length === 3 ){
  _.each(supportedAESmode, function(algo){
     // _.each(supportedOutputEncoding, function(output){
          algorithm = algo;
          outputEncoding = 'hex';
          console.log('#######');
          console.log('Encrypt :'+process.argv[2] + ' algo:'+ algorithm + ' outputEncoding:'+ outputEncoding);
          console.log(encrypt(process.argv[2]));
    //  });
  });
}
else{
  if ( supportedAESmode.indexOf(algorithm) == -1 ){
      console.log('supported mode: ', supportedAESmode);
      return ;
  }

  if ( supportedOutputEncoding.indexOf(outputEncoding) == -1 ){
      console.log('supported output encoding: ', supportedOutputEncoding);
      return ;
  }
  process.argv.forEach(function(argv, index) {
    if (index > 4) {
      console.log('conf:', algorithm, mode, outputEncoding );
      console.log('handling:', argv);

      if ( mode === 'encrypt' || mode === 'e'){
        console.log(encrypt(argv));
      }else{
        console.log(decrypt(argv));
      }
    }
  });
}

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,key);
  var crypted = cipher.update(text,'utf8',outputEncoding);
  crypted += cipher.final(outputEncoding);
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,key);
  var dec = decipher.update(text,'hex',outputEncoding); // handling different input encoding.
  dec += decipher.final(outputEncoding);
  return dec;
}