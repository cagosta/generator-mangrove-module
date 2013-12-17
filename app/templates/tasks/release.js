module.exports = function( grunt ) {


    grunt.config.set( 'release', {

        github: {
            repo: '<%= module.githubPath %>', //put your user/repo here
            usernameVar: '<%= module.githubUser %>', //ENVIRONMENT VARIABLE that contains Github username 
        }

    } )


}