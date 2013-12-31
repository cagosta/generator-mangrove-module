var EngineDetector = function() {
    this.isNode = false
    this.isBrowser = false
    this.isUnknown = false
    this._exports
    this.detect()
}

EngineDetector.prototype = {

    detect: function() {
        if ( typeof module !== 'undefined' && module.exports )
            this._setAsNode()
        else if ( typeof window !== "undefined" )
            this._setAsBrowser()
        else
            this._setAsUnknown()
    },

    _setAsNode: function() {
        this.isNode = true
        this.name = 'node'
    },

    _setAsBrowser: function() {
        this.isBrowser = true
        this._global = window
        this.name = 'browser'
    },

    _setAsUnknown: function() {
        this.isUnknown = true
        this.name = 'unknown'
    },

    setGlobal: function( e ) {
        this._global = e
    },

    ifNode: function( f ) {
        if ( this.isNode )
            f()
    },

    ifBrowser: function( f ) {
        if ( this.isBrowser )
            f()
    },


    exports: function( key, exported ) {
        if ( this.isNode ) {
            this._global.exports = exported
        } else if ( this.isBrowser )
            this._global[  key ] = exported
    },

}

var engine = new EngineDetector()


var baseUrl, requirejs;

engine.ifNode( function() {

    baseUrl = __dirname
    requirejs = require( 'requirejs' )
    engine.setGlobal( module )

} )

engine.ifBrowser( function() {
    baseUrl = '.'
} )


requirejs.config( {
    baseUrl: function(){ return ( typeof define === 'undefined') ? __dirname: '.' }(),
    shim: {
        mocha: {
            exports: 'mocha'
        }
    },
    paths: {
        "<%= config.name.raw %>": '.'
    }
} )


var isStandalone = !! requirejs._defined,
    synchronous = isStandalone

engine.ifNode(function(){

    synchronous = true

})

if ( synchronous ) { // case standalone

    var <%= config.name.camel %> = requirejs( '<%= config.name.raw %>/<%= config.name.raw %>' )

    engine.exports( '<%= config.name.camel %>', <%= config.name.camel %> )


} else {

    requirejs( [ '<%= config.name.raw %>/<%= config.name.raw %>' ], function( <%= config.name.camel %> ) {
        engine.exports( '<%= config.name.camel %>', <%= config.name.camel %> )
    } )

}
