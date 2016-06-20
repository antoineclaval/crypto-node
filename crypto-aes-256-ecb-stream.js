var crypto = require('crypto'),
	iv = new Buffer(''),
    algorithm = 'aes-256-ecb',
    key = new Buffer('e6ee5c9847445e126008575068f1c4429ad34dbfcf7c675f6459c9a71919c0bc', 'hex'),
    chunks = [];

var fs = require('fs');

process.argv.forEach(function(argv, index) {
  if (index > 1) {
		  console.log('argv:',argv);
		  var r = fs.createReadStream(argv, {encoding:'utf8'});
		  // zip content
		  // encrypt content
		  var encrypt = crypto.createCipheriv(algorithm, key,iv);
		  // decrypt content
		  var decrypt = crypto.createCipheriv(algorithm, key, iv);

		  // write file
		  var w = fs.createWriteStream(argv + '.enc.out', {encoding:'hex'});

		  // start pipe
		// r.pipe(encrypt).pipe(decrypt).pipe(w);	
		  r.pipe(encrypt).pipe(w);	
  	}
});