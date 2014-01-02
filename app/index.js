'use strict'
var util = require( 'util' ),
    path = require( 'path' ),
    yeoman = require( 'yeoman-generator' ),
    _ = require( 'underscore.string' ),
    program = require( 'commander' );

program
    .version( '0.0.1' )
    .usage( '[options] <file ...>' )
    .option( '-c, --config_file <path>, Specify a config file' )
    .parse( process.argv )


var MangroveModuleGenerator = function( args, options, config ) {
    this.configFilePath = program.config_file
    yeoman.generators.Base.apply( this, arguments )
}

module.exports = MangroveModuleGenerator

util.inherits( MangroveModuleGenerator, yeoman.generators.Base )

// Yeoman generator extremly strange behaviour ?? Why do you automatically call all generator propotype's methods ? 

var MangroveModuleGeneratorPrototype = {

    readConfig: function( cb ) {

        if ( this.configFilePath ) {

            var cf = this.config = JSON.parse( this.readFileAsString( this.configFilePath ) )
            this.done = this.async()

            this.prompt( [
                {
                    name: 'moduleName',
                    message: 'Would you like call your module?',
                    default: process.cwd().split( '/' ).pop()
                }
            ], function( p ) {
                cf.moduleName = p.moduleName
                cf.name.raw = p.moduleName
                cf.name.snake = _.underscored( cf.name.raw )
                cf.name.slug = _.slugify( cf.name.raw.replace('.', ' ') )
                cf.name.camel = _.camelize( cf.name.raw.replace( '.', ' ' ) )
                cf.deploy.dir = cf.deploy.dir + cf.name.raw
                cf.github.path = cf.github.user + '/' + cf.name.raw
                this.done()
            }.bind( this ) )

        } else {
            console.log( 'No config file specified, asking from prompts ...' )
        }
    },

    readConfigFromPrompts: function( cb ) {
        if ( this.config.github ) // already loaded, Yeoman generator strange behaviour
            return
        this.done = this.async()
        var cf = this.config = JSON.parse( this.readFileAsString( path.join( __dirname, 'templates/_config.json' ) ) )

        this.initializePrompts()

        this.prompt( this.prompts, function( p ) {

            cf.cachedDeps = p.cachedDeps
            cf.moduleName = p.moduleName
            cf.name.raw = p.moduleName
            cf.name.snake = _.underscored( cf.name.raw )
            cf.name.camel = _.camelize( cf.name.raw.replace( '.', ' ' ) )
            cf.name.slug = _.slugify( cf.name.raw.replace('.', ' ') )
            cf.github.path = cf.github.user + '/' + cf.name.raw
            cf.github.user = p.githubUser

            cf.deploy.dir = p.deployDir
            cf.deploy.host = p.deployHost
            cf.deploy.user = p.deployUser

            cf.author.name = p.authorName
            cf.author.email = p.authorEmail
            cf.isFrontEndApp = p.isFrontEndApp
            console.log( 'cf', cf )
            this.done()

        }.bind( this ) )
    },


    doWriteConfig: function() {

        var fs = require( 'fs' )

        this.configFilePath = 'config.json'
        fs.writeFileSync( this.configFilePath, JSON.stringify( this.config, null, 4 ) )

    },

    initializePrompts: function() {

        this.prompts = [
            {
                name: 'moduleName',
                message: 'Would you like call your module?',
                default: process.cwd().split( '/' ).pop()
            },
            {
                name: 'cachedDeps',
                type: 'confirm',
                message: 'Use npm and bower cached modules for install ? ',
                default: false
            },
            {
                name: 'authorName',
                message: 'What is your name, for credit ? ',
                default: ''
            },
            {
                name: 'authorEmail',
                message: 'What is your email, for credit ? ',
                default: ''
            },
            {
                name: 'githubUser',
                message: 'What is your github user name ?',
                default: ''
            },
            {
                name: 'deployHost',
                message: 'What is the deploy host ?',
                default: ''
            },
            {
                name: 'deployDir',
                message: 'What is the deploy dir ?',
                default: ''
            },
            {
                name: 'deployUser',
                message: 'What is the deploy user ?',
                default: ''
            },
            {
                name: 'isFrontEndApp',
                type: 'confirm',
                message: 'Include front-end app backbone and tasks ( include stylus )',
                default: true
            }
        ]

    },

    makeFiles: function() {
        // this.makeRootFiles()
        // this.makeAppFiles()
        // this.makeDocumentationFiles()
        // if ( this.isFrontEndApp )
        //     this.makeFrontEndAppFiles()
        // this.makeTestFiles()
    },


    makeRootFiles: function() {

        this.copy( 'gitignore', '.gitignore' )
        this.copy( 'travis.yml', '.travis.yml' )
        this.copy( 'Gruntfile.js', 'Gruntfile.js' )
        this.template( '_README.md', 'README.md' )

        this.copy( '_package.json', 'package.json' )
        this.template( '_bower.json', 'bower.json' )

    },

    makeAppFiles: function() {

        this.mkdir( 'app' )
        this.template( 'app/_module.js', 'app/' + this.config.name.raw + '.js' )
        this.template( 'app/_main.js', 'app/main.js' )
        this.template( '_app.js', 'app.js' )

    },

    makeDocumentationFiles: function() {

        this.mkdir( 'documentation' )
        this.template( 'documentation/_jsdoc.conf.json', 'documentation/jsdoc.conf.json' )

    },

    makeFrontEndAppFiles: function() {
        if ( !this.config.isFrontEndApp )
            return
        this.mkdir( 'app/assets' )
        this.template( 'app/_index.html', 'app/index.html' )
        this.mkdir( 'app/assets/images' )
        this.mkdir( 'app/assets/stylesheets' )
        this.directory( 'app/assets/stylesheets/commons', 'app/assets/stylesheets/commons' )
        this.template( 'app/assets/stylesheets/module_name.styl', 'app/assets/stylesheets/' + this.config.name.raw + '.styl' )

    },

    makeTestFiles: function() {

        this.mkdir( 'test' )
        this.mkdir( 'test/suites' )
        this.mkdir( 'dist' )
        this.mkdir( 'dist/build' )
        this.mkdir( 'dist/build/bower_components' )
        this.mkdir( 'dist/build/bower_components/requirejs' )

        this.directory( 'test/assets', 'test/assets' )
        this.directory( 'tasks', 'tasks' )

        this.template( 'test/_test_main.js', 'test/test_main.js' )
        this.template( 'test/TestRunner.js', 'test/TestRunner.js' )
        this.template( 'test/suites/_MainTestSuite.js', 'test/suites/MainTestSuite.js' )
        this.template( 'test/_index.html', 'test/index.html' )

    },

    installDeps: function() {

        this.bowerInstall( null, {
            skipInstall: this.options[ 'skip-install' ],
            offline: this.config.cachedDeps
        }, function() {
            // this.spawnCommand( 'grunt', [ 'bower' ] )
            // .on( 'close', function() {
            this.npmInstall( null, {
                skipInstall: this.options[ 'skip-install' ],
                cacheMin: this.config.cachedDeps ? 999999 : 0
            }, function() {}.bind( this ) )
            // }.bind( this ) )
        }.bind( this ) )


    }

}

for ( var method in MangroveModuleGeneratorPrototype )
    if ( MangroveModuleGeneratorPrototype.hasOwnProperty( method ) )
        MangroveModuleGenerator.prototype[ method ] = MangroveModuleGeneratorPrototype[ method ]