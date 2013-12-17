module.exports = function( grunt ) {

    grunt.config.set( 'watch', {

        options: {
            nospawn: true,
            livereload: grunt.config.get('module.livereloadPort')
        },

        livereload: {
            files: [
                    'app/*',
                    'config.json'
                ],
            tasks: [ 'build' ]
        }

    } )

}