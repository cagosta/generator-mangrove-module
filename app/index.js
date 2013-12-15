'use strict'
var util = require( 'util' )
var path = require( 'path' )
var yeoman = require( 'yeoman-generator' )


var MangroveModuleGenerator = module.exports = function MangroveModuleGenerator( args, options, config ) {
    yeoman.generators.Base.apply( this, arguments )

    this.on( 'end', function() {
        this.installDependencies( {
            skipInstall: options[ 'skip-install' ]
        } )
    } )

    this.pkg = JSON.parse( this.readFileAsString( path.join( __dirname, '../package.json' ) ) )
}

util.inherits( MangroveModuleGenerator, yeoman.generators.Base )

MangroveModuleGenerator.prototype.askFor = function askFor() {
    var cb = this.async()

    // have Yeoman greet the user.
    console.log( this.yeoman )

    var prompts = [ {
        name: 'moduleName',
        message: 'Would you like call your module?',
        default: 'mangrove_module'
  } ]

    this.prompt( prompts, function( props ) {
        this.moduleName = props.moduleName
        cb()

    }.bind( this ) )
}

MangroveModuleGenerator.prototype.app = function app() {

    this.mkdir( 'app' )
    this.template( 'app/_module.js', 'app/' + this.moduleName + '.js' )

    this.mkdir( 'documentation' )
    this.copy( '_package.json', 'package.json' )
    this.copy( '_bower.json', 'bower.json' )
    this.copy( 'gitignore', 'gitignore' )
    this.copy( 'travis.yml', '.travis.yml')


    this.copy( 'Gruntfile.js', 'Gruntfile.js' )
    this.template( '_README.md', 'README.md' )


    this.template( '_bower.json', 'bower.json' )
    this.template( '_config.json', 'config.json' )
    this.template( '_package.json', 'package.json' )

    this.makeTestFiles()

}

MangroveModuleGenerator.prototype.makeTestFiles = function() {
    this.mkdir( 'test' )
    this.mkdir( 'test/suites' )
    this.directory( 'test/assets', 'test/assets' )
    this.template( 'test/_test_main.js', 'test/test_main.js' )
    this.template( 'test/TestRunner.js', 'test/TestRunner.js' )
    this.template( 'test/suites/_MainTestSuite.js', 'test/suites/MainTestSuite.js' )
    this.template( 'test/_index.html', 'test/index.html' )
}

MangroveModuleGenerator.prototype.projectfiles = function projectfiles() {
    this.copy( 'jshintrc', '.jshintrc' )
}