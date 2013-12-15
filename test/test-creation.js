/*global describe, beforeEach, it*/
'use strict'

var path = require( 'path' )
var helpers = require( 'yeoman-generator' ).test


describe( 'mangrove-module generator', function() {

    beforeEach( function( done ) {

        helpers.testDirectory( path.join( __dirname, 'temp' ), function( err ) {
            if ( err ) {
                return done( err )
            }


            this.app = helpers.createGenerator( 'mangrove-module:app', [
                '../../app'
            ] )
            done()
        }.bind( this ) )

    } )

    it( 'creates expected files', function( done ) {

        var expected = [
            '.jshintrc',
            'test/TestRunner.js',
            'documentation',
            'package.json',
            'bower.json',
            'config.json',
            '.gitignore',
            '.travis.yml',
            'Gruntfile.js',
            'README.md',
            'app',
            'test/suites',
            'test/assets',
            'test/test_main.js',
            'test/TestRunner.js',
            'test/suites/MainTestSuite.js',
            'test/index.html'
        ]

        helpers.mockPrompt( this.app, {
            githubUser: 'cagosta',
            moduleName: 'module_name'
        } )

        this.app.options[ 'skip-install' ] = true
        
        this.app.run( {}, function() {
            helpers.assertFiles( expected )
            done()
        } )

    } )
} )