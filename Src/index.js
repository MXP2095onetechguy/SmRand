// SmRand (SiMpleRANDom)
//
// MIT License
// 
// Copyright (c) 2021 MXPSQL
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// lightweight random library, pure javascript, no dependency, open source
// needs nodejs to be built with the crypto module

const fs = require("fs");
const crypto = require("crypto");

const smrandModule = {

    // module property
    version: require("../package.json").version,


    // not cryptographycally secure
    getRndIntegerInclusive: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) );
    },

    getRndInteger: (min, max) => {
        return Math.floor(Math.random() * (max - min) );
    },

    arrayShuffle: (array) => {
        var result = array;

        for(var i = 0; i < array.length; i++){
            var buffer = array[i];
            var replacementi = smrandModule.getRndIntegerInclusive(0, array.length - 0);
            result[i] = array[replacementi];
            result[replacementi] = buffer;
            
        }

        return result;
    },

    randomString: (length) => {
        let result = "", seeds
    
        for(let i = 0; i < length - 1; i++){
            //Generate seeds array, that will be the bag from where randomly select generated char
            seeds = [
                Math.floor(Math.random() * 10) + 48,
                Math.floor(Math.random() * 25) + 65,
                Math.floor(Math.random() * 25) + 97
            ]
            
            //Choise randomly from seeds, convert to char and append to result
            result += String.fromCharCode(seeds[Math.floor(Math.random() * 3)])
        }
    
        return result
    },

    tmpFilePath: (length=8, extlen=3) => {
        // 8 filename length and 3 extension length for dos limitation

        var filename = "";

        while(true){
            if(extlen < 1){
                filename = smrandModule.randomString(length);
            }
            else{
                filename = smrandModule.randomString(length) + "." + smrandModule.randomString(extlen);
            }

            if(!fs.existsSync(filename)){
                break;
            }
        }

        return filename;
    },
    


    // cryptographycally secure
    cryptoRandomString: (length) => {
        const buf = crypto.randomBytes(length);
        return buf.toString("hex");
    },

    cryptoTmpFilePath: (length=8, extlen=3) => {
        // 8 filename length and 3 extension length for dos limitation

        var filename = "";

        while(true){
            if(extlen < 1){
                filename = smrandModule.cryptoRandomString(length);
            }
            else{
                filename = smrandModule.cryptoRandomString(length) + "." + smrandModule.cryptoRandomString(extlen);
            }

            if(!fs.existsSync(filename)){
                break;
            }
        }

        return filename;
    },

    cryptoGetRndInteger: (min, max) => {
        return crypto.randomInt(min, max);
    },

    cryptoGetRndIntegerInclusive: (min, max) => {
        return smrandModule.cryptoGetRndInteger(min, max + 1);
    },

    cryptoArrayShuffle: (array) => {
        var result = array;

        for(var i = 0; i < array.length; i++){
            var buffer = array[i];
            var replacementi = smrandModule.cryptoGetRndInteger(0, array.length - 0);
            result[i] = array[replacementi];
            result[replacementi] = buffer;
            
        }

        return result;
    },

    // cryptographycally secure or not depend if it hits one, this is also called super
    // if the chooser picks 0, normal, else cryptography
    superRandomString: (length) => {
        var result;
        if(smrandModule.cryptoGetRndInteger(0, 3) == 0){
            result = randomString(length);
        }
        else{
            result = cryptoRandomString(length);
        }

        return length;
    },

    superTmpFilePath: (length=8, extlen=3) => {
        // 8 filename length and 3 extension length for dos limitation

        var filename = "";
        if(smrandModule.cryptoGetRndInteger(0, 3) == 0){
            filename = smrandModule.tmpFilePath(length, extlen);
        }
        else{
            filename = smrandModule.cryptoTmpFilePath(length, extlen);
        }


        return filename;
    },

    superGetRndInteger: (min, max) => {
        var result;
        if(smrandModule.cryptoGetRndInteger(0, 3) == 0){
            result = smrandModule.getRndInteger(min, max);
        }
        else{
            result = smrandModule.cryptoGetRndInteger(min, max);
        }
        return result;
    },

    superGetRndIntegerInclusive: (min, max) => {
        return smrandModule.superGetRndInteger(min, max + 1);
    },

    superArrayShuffle: (array) => {
        var result = array;

        for(var i = 0; i < array.length; i++){
            var buffer = array[i];
            var replacementi = smrandModule.superGetRndIntegerInclusive(0, array.length - 0);
            result[i] = array[replacementi];
            result[replacementi] = buffer;
            
        }

        return result;
    },

    superGarbageGen: (arraylen=null, tmpfilenamelen=30, tmpfileextlen=10) => {
        // hot garbage generator, exclusive to the super functions
        var array = [];

        if(arraylen == null){
            arraylen = smrandModule.superGetRndIntegerInclusive(20, 50);
        }

        for(var i = 0; i < arraylen; i++){
            array.push(smrandModule.superTmpFilePath(tmpfilenamelen, tmpfileextlen));
        }

        array = smrandModule.superArrayShuffle(array);

        return array;
    }
};


// export it
module.exports = smrandModule;

// alias
const smrand = smrandModule;


// test
if(require.main == module){
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
    console.log(smrandModule.cryptoArrayShuffle( [1, "gjs", "gtk", 21, 34, { a: "a" }, ["this", "a"], {a: {"a": "gnome-js", "gnome": "arch-linux"}, node: "node.js", tmpFile: smrandModule.cryptoTmpFilePath(30)}, smrandModule.cryptoTmpFilePath(30) ] ));

    console.log("==Super==");
    console.log(smrandModule.superGetRndInteger(0, 2));
    console.log(smrandModule.superGetRndIntegerInclusive(0, 2));
    console.log(smrandModule.superTmpFilePath(30));
    console.log(smrandModule.superArrayShuffle( [1, "gjs", "gtk", 21, 34, { a: "a" }, ["this", "a"], {a: {"a": "gnome-js", "gnome": "arch-linux"}, node: "node.js", tmpFile: smrandModule.superTmpFilePath(30)}, smrandModule.superTmpFilePath(30) ] ));
    console.log(String(smrandModule.superGarbageGen(5)));
}