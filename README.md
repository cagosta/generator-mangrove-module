# Mangrove module generator [![Build Status](https://secure.travis-ci.org/cagosta/generator-mangrove-module.png?branch=master)](https://travis-ci.org/cagosta/generator-mangrove-module)

A [Yeoman](http://yeoman.io) generator for modules with requirejs, grunt, bower, connect, live-reload, jsdoc, mocha, sinon, chai, mocha-phantomjs with usefull tasks such as browser-ready and node-ready standalone files build  


### Not ready
This generator is currently in development, use it only if you now what you're doing.  
It has never been use for a real use case.  


### Install  

With sudo 

```
$ npm install -g yo  
$ npm install -g generator-mangrove-module
$ mkdir [module_name] 
$ cd [module_name]
$ yo mangrove-module
```

Usual flow  
```
mkdir [module_name] && cd [module_name]
yo mangrove-module --config_file [../config-file-path].json # ( see below  )
grunt postinstall # install bower dependencies, run tests
grunt inject_rjsconfig # inject requirejs paths config into app/main.js and test/test_main.js
grunt test # run test with phantomjs and mocha
grunt git:install # git init; create github repository; git remote add origin git@github ..
# subl .
# code ...
bower install anothermodule
grunt inject_rjsconfig
# code .. 
git add . 
git commit -m "foo"
grunt publish # publish into npm and bower registry
grunt release # create and push tag, build standalone, run tests, send new version to npm
```

### Features  
- Create app directory tree  
- Install dependencies and configure package.json, bower.json  
- Install phantomjs with a postinstall script (run sudo npm install)
- Initialize git & remote  
- Create config.json file & inject it in grunt  
- Add requirejs paths configuration thanks to grunt-bower-requirejs  
- Create ready-to-use test files for phantomjs, mocha, chai, requirejs  
- Create export file for node.js  
- Build standalone dist files ( almond.js )



### Config file  

Instead of rewriting the same config entries over and over ( github account, email .. ), you can just specify a config file.  
For example, my base config file is:  
```
{
    "name": {
        "raw": "<%= moduleName %>",
        "camel": "<%= moduleName %>",
        "snake": "<%= moduleName %>"
    },
    "github": {
        "user": "cagosta",
        "path": "cagosta/<%= moduleName %>"
    },
    "livereloadPort": 35729,
    "author": { 
        "name": "Cyril Agosta",
        "email": "cyril.agosta.dev@gmail.com"
    },
    "deploy": { // for rsync deployment
        "host": "yoursite.fr",
        "dir": "/var/www/yoursite.fr/",
        "user": "cyril"
    },
    "cachedDeps": false,
    "moduleName": "<%= moduleName %>",
    "isFrontEndApp": true
}
```
and I store it into `~/default-mangrove-module.config.json`


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
$ grunt test:browser
```

Beta: run your tests with saucelabs:
* add your saucelabs credentials into .credentials.json 
```
{
 
    "saucelabs": {
        "username": "",
        "key": ""
    }   

}
```
configure the browser your want your tests to run on in `config.json` and then:
```
grunt test:sauce
```

### Build 

Build standalone files for the browser with a lighweight AMD loader and expose window[ moduleName ] 

```
grunt build 
```

### Doc   

Generate jsdoc with 
```
grunt generate_doc
```

### Git

An empty git repository and a remote pointing at github:<%= githubUser %>/<%= moduleName %> are automatically added.  
Create a github repository with:
```
grunt git:create_github_repo
```

### Deploy  

Deploy via rsync with 
```
grunt deploy
```

This will rsync the dist/build folder to the host you specified in config.json 

### Release

See [grunt-release](https://github.com/geddski/grunt-release)

### Generate stylus stylesheet 

In case of frontEndApp, generate .css file from .stylus with 
```
grunt make_stylesheet
```


### Yeoman  

This is a Yeoman generator  

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).



## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)



