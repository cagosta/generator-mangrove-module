module.exports = function( grunt ) {


    grunt.config.set( 'exec.headless_test', {
        command: 'mocha-phantomjs test/index.html'
    } )

    grunt.registerTask( 'headless_test', 'Run tests in the browser', [
        'exec:headless_test'
    ] )

    grunt.registerTask( 'browser_test', 'Run tests with phantomjs', [
        'inject_rjsconfig',
        'open:test_page'
    ] )

    grunt.registerTask( 'test', [
        'headless_test'
    ] )

}