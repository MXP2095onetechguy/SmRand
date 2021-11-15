const smrand = require("./index.js");


// test from import
console.log(`SmRAND version ${smrandModule.version}`);
console.log("==Normal==");
console.log(smrand.getRndInteger(0, 2));
console.log(smrand.getRndIntegerInclusive(0, 2));
console.log(smrandModule.tmpFilePath(30));
console.log(smrandModule.arrayShuffle( [1, "gjs", "gtk", 21, 34, { a: "a" }, ["this", "a"], {a: {"a": "gnome-js", "gnome": "arch-linux"}, node: "node.js", tmpFile: smrandModule.tmpFilePath(30)}, smrandModule.tmpFilePath(30) ] ));

console.log("==Crypto==");
console.log(smrand.cryptoGetRndInteger(0, 2));
console.log(smrand.cryptoGetRndIntegerInclusive(0, 2));
console.log(smrand.cryptoTmpFilePath(30));
console.log(smrand.cryptoArrayShuffle( [1, "gjs", "gtk", 21, 34, { a: "a" }, ["this", "a"], {a: {"a": "gnome-js", "gnome": "arch-linux"}, node: "node.js", tmpFile: smrandModule.tmpFilePath(30)}, smrandModule.tmpFilePath(30) ] ));

console.log("==Super==");
console.log(smrand.superGetRndInteger(0, 2));
console.log(smrand.superGetRndIntegerInclusive(0, 2));
console.log(smrand.superTmpFilePath(30));
console.log(smrand.superArrayShuffle( [1, "gjs", "gtk", 21, 34, { a: "a" }, ["this", "a"], {a: {"a": "gnome-js", "gnome": "arch-linux"}, node: "node.js", tmpFile: smrandModule.tmpFilePath(30)}, smrandModule.tmpFilePath(30) ] ));