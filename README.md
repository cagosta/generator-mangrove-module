# generator-mangrove-module [![Build Status](https://secure.travis-ci.org/cagosta/generator-mangrove-module.png?branch=master)](https://travis-ci.org/cagosta/generator-mangrove-module)

A [Yeoman](http://yeoman.io) generator for modules with with requirejs, grunt, bower, connect, live-reload, mocha, sinon, chai, mocha-phantomjs  


### Not ready 
The generotr is currently in development, use if you now what you're doing.  


### Features  
- Create app directory tree  
- Install dependencies and configure package.json, bower.json  
- Install phantomjs with a postinstall script (run sudo npm install)
- Initialize git && remote  
- Create config.json file & inject it in grunt  
- Add requirejs paths configuration thanks to grunt-bower-requirejs  
- Create ready-to-use test files for phantomjs, mocha, chai, requirejs  
- Create export file for node.js  
- Simple connect server to deliver the modules ( useless ? )  
- Build standalone dist files ( almond.js )  

### To do
- Test Generator ( hard ? )  
- Use in a real project  
- Is running npm install -g in a postinstall script dirty ?  
- Clean server & livereload ( working ? )  
- Run tests with node.js  
- Clean task naming   
- Automatic top level folder creation  
- Avoid re-installing phantomjs when already installed  
- Reduce size when installed ( feasible ? node_modules 51MB, bower_components 19MB wtf ? )  


### Install  

```
$ npm install -g yo  
$ npm install generator-mangrove-module
$ mkdir [module_name] 
$ yo mangrove-module
```


### Test 

Run your test suites with:
```
$ grunt test 
```

which is just an alias for   
```
$ grunt headless_test
```
It will run your tests in a headless browser (phantomjs) with mocha

Or run your tests in the browser:  
- go to ./test/index.html 
or 
- start the server with  

```
$ grunt server
```

and then  

```
$ grunt browser_test
```


### Yeoman  

This is a Yeoman generator  

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
