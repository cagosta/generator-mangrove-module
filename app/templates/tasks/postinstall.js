module.exports = function( grunt ) {

    grunt.config.set( 'exec.postinstall', {
        command: 'sudo npm install -g mocha-phantomjs phantomjs'
    } )

    grunt.registerTask( 'postinstall', 'Install mocha && mocha phantomjs globally with npm -g', [
        'exec:postinstall',
        'inject_rjsconfig',
        'git:init',
        'git:addOrigin',
        'test'
    ] )


}