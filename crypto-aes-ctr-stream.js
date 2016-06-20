var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    key = 'e6ee5c9847445e126008575068f1c4429ad34dbfcf7c675f6459c9a71919c0bc';

var fs = require('fs');

// input file

process.argv.forEach(function(argv, index) {
  if (index > 1) {
		  console.log('argv:',argv);
		  var r = fs.createReadStream(argv);
		  // zip content
		  // encrypt content
		  var encrypt = crypto.createCipher(algorithm, key);
		  // decrypt content
		  var decrypt = crypto.createDecipher(algorithm, key);

		  // write file
		  var w = fs.createWriteStream(argv + '.enc.out');

		  // start pipe
		// r.pipe(encrypt).pipe(decrypt).pipe(w);	
		  r.pipe(encrypt).pipe(w);	
  	}
});