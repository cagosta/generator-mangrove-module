module.exports = function( grunt ) {

    grunt.config.set( 'bower', {

        test_main: {
            rjsConfig: 'test/test_main.js',
            options: {
                baseUrl: './'
            }
        },

        standalone: {
            rjsConfig: 'app/standalone.js',
            options: {
                baseUrl: './app'
            }
        }

    } )

    grunt.config.set( 'replace.standaloneBaseUrl', {
        src: 'app/standalone.js',
        overwrite: true,
        replacements: [
            {
                from: "baseUrl: '.',\n    shim",
                to: "baseUrl: function(){ return ( typeof define === 'undefined') ? __dirname: '.'}(),\n    shim"
            }
        ]
    } )

    grunt.registerTask( 'inject_rjsconfig', function() {
        grunt.task.run( [ 'bower:test_main', 'bower:standalone', 'replace:standaloneBaseUrl' ] )

    } )

}