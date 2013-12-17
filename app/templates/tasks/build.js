
var Builder = function( o ) {
    this.grunt = o.grunt
    this.config = this.grunt.config.get( 'module' )
    this.initializePaths()
    this.setRequirejsConfig()
    this.run()
}

Builder.prototype = {

    initializePaths: function() {
        this.basePath = 'dist'
        this.tempPath = [  this.basePath, 'temp' ].join( '/' ) + '/'
        this.moduleName = this.config.moduleName
        this.version = this.config.version
        this.separator = '-'
        this.min = 'min'
        this.standalone = 'standalone'
        this.fileType = '.js'

    },

    getStandaloneFilename: function() {
        return [  this.moduleName, this.version, this.standalone, ].join( this.separator ) + this.fileType
    },

    getStandaloneMinFilename: function() {
        return [  this.moduleName, this.version, this.standalone, this.min ].join( this.separator ) + this.fileType
    },

    getStandalonePath: function() {
        return [ this.basePath, this.getStandaloneFilename() ].join( '/' )
    },

    getStandaloneMinPath: function() {
        return [ this.basePath, this.getStandaloneMinFilename() ].join( '/' )
    },

    log: function() {
        for ( var i in this )
            if ( this.hasOwnProperty( i ) )
                console.log( i, this[ i ] )

    },

    setRequirejsConfig: function() {

        this.mainConfigFile = 'app/standalone.js'
        this.name = '<%= module.moduleName %>/standalone'

        this.grunt.config.set( 'requirejs', {

            standalone: { // see https://github.com/jrburke/r.js/blob/master/build/example.build.js

                options: {
                    mainConfigFile: this.mainConfigFile,
                    optimize: 'none',
                    wrap: true,
                    out: this.getStandalonePath(),
                    name: this.name,
                    include: [ 'bower_components/almond/almond' ]
                }

            },

            standaloneMin: {

                options: {
                    mainConfigFile: this.mainConfigFile,
                    optimize: 'uglify2',
                    wrap: true,
                    out: this.getStandaloneMinPath(),
                    name: this.name,
                    include: [ 'bower_components/almond/almond' ]

                }
            }

        } )

    },

    run: function() {

        this.grunt.task.run( [ 'requirejs:standalone', 'requirejs:standaloneMin' ] )

    }

}

module.exports = function( grunt ) {


    grunt.registerTask( 'build', function() {

        grunt.task.run( [ 'inject_rjsconfig' ] )

        new Builder( {
            grunt: grunt
        } )

    } )
}