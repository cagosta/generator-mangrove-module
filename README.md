# generator-mangrove-module [![Build Status](https://secure.travis-ci.org/cagosta/generator-mangrove-module.png?branch=master)](https://travis-ci.org/cagosta/generator-mangrove-module)

A [Yeoman](http://yeoman.io) generator for modules with with requirejs, grunt, bower, connect, live-reload, mocha, sinon, chai, mocha-phantomjs  


## Not ready 
This generator is not usable yet, it's in development  

## Getting Started


### Install  

```
$ npm install -g yo  
$ mkdir module_name  
$ yo mangrove-module  
```
You can then start the server by typing: 

```
$ grunt server 
```


### Test 

Run your test suites with:
```
$ grunt test 
```

In fact, grunt test is just an alias for   
```
$ grunt headless_test
```
It will run your tests in a headless browser (phantomjs) with mocha

If you want to run your tests in the browser, go to ./test/index.html
or run 
```
$ grunt browser_test
```


### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
