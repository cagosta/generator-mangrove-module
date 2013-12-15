'use strict'
var util = require( 'util' ),
    path = require( 'path' ),
    yeoman = require( 'yeoman-generator' );


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
    var cb = this.async(),
        prompts = [ {
            name: 'moduleName',
            message: 'Would you like call your module?',
            default: 'mangrove_module'
        }, {
            name: 'githubUser',
            message: 'What is your github user name ?',
            default: 'cagosta'
        } ];

    this.prompt( prompts, function( props ) {
        this.moduleName = props.moduleName
        this.githubUser = props.githubUser
        this.githubPath = this.githubUser + '/' + this.moduleName
        cb()
    }.bind( this ) )

}


MangroveModuleGenerator.prototype.app = function() {

    this.makeRootFiles()
    this.makeAppFiles()
    this.makeTestFiles()

}

MangroveModuleGenerator.prototype.makeRootFiles = function() {
    this.mkdir( 'documentation' )

    this.copy( '_package.json', 'package.json' )
    this.template( '_bower.json', 'bower.json' )
    this.template( '_config.json', 'config.json' )
    this.copy( 'gitignore', '.gitignore' )
    this.copy( 'travis.yml', '.travis.yml' )

    this.copy( 'Gruntfile.js', 'Gruntfile.js' )
    this.template( '_README.md', 'README.md' )

}


MangroveModuleGenerator.prototype.makeAppFiles = function() {
    this.mkdir( 'app' )
    this.template( 'app/_module.js', 'app/' + this.moduleName + '.js' )

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