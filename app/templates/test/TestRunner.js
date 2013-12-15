define( [
    'chai',
    'chai-as-promised',
    'sinonjs',
    'sinon-chai',
    'mocha'
 ], function( chai, chaiAsPromise, sinon, sinonChai, mocha ) {

    Function.prototype.bind || ( Function.prototype.bind = function( scope ) {
        var self = this
        return ( function() {
            return ( self.apply( scope, arguments ) )
        } )
    } )

    var TestRunner = function() {

        this.suiteUrls = [
            'test/suites/MainTestSuite'
        ]

        this.detectExecutionEnvironment()
        this.initializeGlobal()
        this.initializeMocha()

        this.chai = chai
        this.chai.use( chaiAsPromise )
        this.chai.use( sinonChai )

        this.defineGlobals()
        this.mocha.setup( 'bdd' )

        this.requireSuites( this.onSuiteReady.bind( this ) )

    }

    TestRunner.prototype = {

        initializeMocha: function() {
            this.mocha = mocha
        },

        onSuiteReady: function() {
            this.run()
        },

        run: function() {
            for ( var i = 0; i < this.testSuites.length; i++ ) {
                this.runTestSuite( this.testSuites[ i ] )
            }
            if ( this.global.mochaPhantomJS ) {
                this.global.mochaPhantomJS.run()
            } else
                this.mocha.run()
        },

        runTestSuite: function( testSuite ) {
            testSuite( this.config )
        },

        initializeGlobal: function() {
            if ( this.isBrowser ) {
                this.global = window
            } else if ( this.isNode ) {
                this.global = global
            }
        },

        defineGlobals: function() {
            this.global.expect = this.chai.expect
        },

        requireSuites: function( cb ) {
            require( this.suiteUrls, function() {
                this.setTestSuites( Array.prototype.slice.call( arguments ) )
                cb()
            }.bind( this ) )
        },

        setTestSuites: function( t ) {
            this.testSuites = t
        },

        getMochaLayout: function() {
            return document.getElementById( 'mocha' )
        },

        detectExecutionEnvironment: function() {
            this.isBrowser = ( typeof window !== 'undefined' )
            this.isNode = !this.isBrowser
        }
    }

    return TestRunner


} )