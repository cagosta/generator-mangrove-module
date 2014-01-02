// just an alias to the main to have bower-requirejs working

define( [
    './<%= config.name.raw %>'
 ], function( <%= config.name.camel %> ) {

    return <%= config.name.camel %>

} )