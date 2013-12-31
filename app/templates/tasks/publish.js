module.exports = function( grunt ) {



    grunt.registerTask( 'publish', function() {


        grunt.config.set( 'exec.bower_register', {
            command: 'bower register <%= config.name.raw %> git://github.com/<%= config.github.path %>'
        } )

        grunt.config.set( 'exec.npm_publish', {
            command: 'npm publish'
        } )

        grunt.task.run( [ 'build', 'test', 'exec:bower_register', 'exec:npm_publish' ] )

    } )


}