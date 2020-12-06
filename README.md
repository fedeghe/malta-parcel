---
[![npm version](https://badge.fury.io/js/malta-parcel.svg)](http://badge.fury.io/js/malta-parcel)
[![npm downloads](https://img.shields.io/npm/dt/malta-parcel.svg)](https://npmjs.org/package/malta-parcel)
[![npm downloads](https://img.shields.io/npm/dm/malta-parcel.svg)](https://npmjs.org/package/malta-parcel)  
---  

This plugin needs `parcel-bundler` to be installed globally.  

This plugin can be used on: **.html** files and even on **.md** and **.pug** files after using the right plugin

Options :  
- **port**: the port to run dev server through parcel (default is 1234)

Sample usage:  
```
malta app/source/index.html public -plugins=malta-parcel
```
or in the .json file :
```
"app/source/index.html" : "public -plugins=malta-parcel[port:1881]"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/index.html',
    'public',
    '-plugins=malta-parcel',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```