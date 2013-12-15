'use strict'

if ( typeof window === 'undefined' )
    global.requirejs = require( 'requirejs' )


requirejs.config( {
    baseUrl: '../',
    shim: {
        mocha: {
            exports: 'mocha'
        }
    },
    paths: {
        Seed: 'app'
    }
} )


requirejs( [ 'test/TestRunner' ], function( TestRunner ) {

    new TestRunner()

} )