var CryptoJS = require('crypto-js');

// https://gist.github.com/marcoslin/8026990
module.exports = {
			
	decrypt: function (cypher, key) {

		var key = CryptoJS.enc.Hex.parse(key),
		 	iv = CryptoJS.enc.Hex.parse(""),
			cipher = CryptoJS.lib.CipherParams.create({
				ciphertext: CryptoJS.enc.Base64.parse(cypher)
			}),
			result = CryptoJS.AES.decrypt(cipher, key, {iv: iv, mode: CryptoJS.mode.CFB});
		
		return result.toString(CryptoJS.enc.Utf8);

	},
	encrypt: function (plaintext, key) {

		var key = CryptoJS.enc.Hex.parse(key),
		 	iv = CryptoJS.enc.Hex.parse("");
			result = CryptoJS.AES.encrypt(plaintext, key, {iv: iv, mode: CryptoJS.mode.CFB});
		
		return result.toString();

	}

};