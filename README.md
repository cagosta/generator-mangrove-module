# generator-mangrove-module [![Build Status](https://secure.travis-ci.org/cagosta/generator-mangrove-module.png?branch=master)](https://travis-ci.org/cagosta/generator-mangrove-module)

A [Yeoman](http://yeoman.io) generator for modules with with requirejs, grunt, bower, connect, live-reload, mocha, sinon, chai, mocha-phantomjs  


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
It will run your tests in a headless browser (phantomjs) and mocha

If you want to run your tests in the browser, go to ./test/index.html
or run 
```
$ grunt browser_test
```


### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-mangrove-module from npm, run:

```
$ npm install -g generator-mangrove-module
```

Finally, initiate the generator:

```
$ yo mangrove-module
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
