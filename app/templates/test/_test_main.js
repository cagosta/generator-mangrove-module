'use strict'

if ( typeof window === 'undefined' )
    global.requirejs = require( 'requirejs' )


requirejs.config( {
    baseUrl: function(){ return ( typeof define === 'undefined') ? __dirname + '/../app': '../app'}(),
    shim: {
        mocha: {
            exports: 'mocha'
        }
    },
    paths: {
        '<%= config.name.raw %>': '.',
        test: '../test'
    }
} )

requirejs( [ 'test/TestRunner' ], function( TestRunner ) {

    new TestRunner()

} )