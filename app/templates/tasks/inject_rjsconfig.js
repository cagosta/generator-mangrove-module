module.exports = function( grunt ) {

    grunt.config.set( 'bower', {

        test_main: {
            rjsConfig: 'test/test_main.js',
            options: {
                baseUrl: './'
            }
        },

        main: {
            rjsConfig: 'app/main.js',
            options: {
                baseUrl: './app'
            }
        }

    } )

    // dirty double hack \o/, to be documented 
    grunt.config.set( 'replace.mainBaseUrl', {

        src: 'app/main.js',
        overwrite: true,
        replacements: [
            {
                from: "baseUrl: '.',\n    shim",
                to: "baseUrl: function(){ return ( typeof define === 'undefined') ? __dirname: '.'}(),\n    shim"
            }
        ]
        
    } )

    grunt.registerTask( 'inject_rjsconfig', function() {

        grunt.task.run( [ 'bower:test_main', 'bower:main', 'replace:mainBaseUrl' ] )

    } )

}