module.exports = function( grunt ) {

    grunt.registerTask( 'git:addOrigin', function() {

        grunt.config.set( 'exec.gitAddOrigin', {

            command: 'git remote add origin git@github.com/<%= module.githubPath %>'

        } )

        grunt.task.run( 'exec:gitAddOrigin' )

    } )

    grunt.registerTask( 'git:init', function() {

        grunt.config.set( 'exec.gitInit', {
            command: 'git init'
        } )

        grunt.task.run( 'exec:gitInit' )

    } )


}