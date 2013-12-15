'use strict'

var LIVERELOAD_PORT = 35729,
    lrSnippet = require( 'connect-livereload' )( {
        port: LIVERELOAD_PORT
    } ),
    mountFolder = function( connect, dir ) {
        return connect.static( require( 'path' ).resolve( dir ) )
    }

module.exports = function( grunt ) {

    require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks )

    grunt.initConfig( {
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                files: [
                    'app/*',
                    'config.json'
                ],
                tasks: [ 'build' ]
            }
        },
        exec: {
            headless_test: {
                command: 'mocha-phantomjs test/index.html'
            },
            postinstall: {
                command: 'sudo npm install -g mocha-phantomjs phantomjs'
            }
        },
        bower: {
            inject_paths_in_test_main: {
                rjsConfig: 'test/test_main.js',
                options: {
                    baseUrl: './'
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost' // change this to '0.0.0.0' to access the server from outside
            },
            livereload: {
                options: {
                    middleware: function( connect ) {
                        return [
                            lrSnippet,
                            mountFolder( connect, '.' )
                            ]
                    }
                }
            }
        },
        open: {
            server_index: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            test_page: {
                path: 'http://localhost:<%= connect.options.port %>/test'
            }
        }
    } )

    grunt.registerTask( 'headless_test', 'Run tests in the browser', [ 'exec:headless_test' ] )

    grunt.registerTask( 'browser_test', 'Run tests with phantomjs', [ 'bower:inject_paths_in_test_main', 'open:test_page' ] )

    grunt.registerTask( 'test', [ 'headless_test' ] )

    grunt.registerTask( 'postinstall', 'Install globally with npm mocha && mocha phantomjs', [ 'exec:postinstall', 'bower' ] )

    grunt.registerTask( 'server', [ 'build', 'connect:livereload', 'open:test_page', 'watch' ] )

    grunt.registerTask( 'build', 'Build app', [ 'bower:inject_paths_in_test_main' ] )
}