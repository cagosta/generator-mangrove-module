var Deployer = function( o ) {

    this.grunt = o.grunt
    this.setExecGruntConfig()
    this.skipBuild = this.grunt.option( 'skipBuild' )
    this.run()
    
}


Deployer.prototype = {

    setExecGruntConfig: function() {

        // this.grunt.config.set( 'config.build', {
        //     dir: ''
        // } )

        var command = this.grunt.config.process( 'rsync -e ssh -avzO ./dist/build/ <%= config.deploy.user %>@<%= config.deploy.host %>:<%= config.deploy.dir %>' )

        this.grunt.config.set( 'exec.send', {
            command: command
        } )

    },

    run: function() {
        if ( this.skipBuild )
            this.grunt.task.run( [ 'exec:send' ] )
        else
            this.grunt.task.run( [ 'build', 'exec:send' ] )
    }

}

module.exports = function( grunt ) {

    grunt.registerTask( 'deploy', function() {

        new Deployer( {
            grunt: grunt,
        } )

    } )

}