module.exports = function( grunt ) {


    grunt.registerTask( 'install_bower_dependencies', function() {

        var done = this.async()

        grunt.log.writeln( 'Installing bower dependencies' )

        var bower = require( 'bower' )

        bower.commands.install( [] ).on( 'end', function() {

            grunt.log.writeln( 'Mangrove module generator postinstall -> Installed bower dependencies.' )

            done()

        } )


    } )

    grunt.registerTask( 'postinstall', [ 'install_bower_dependencies', 'inject_rjsconfig', 'test:all' ] )


}