define( [
    '<%= config.name.raw %>/<%= config.name.raw %>'
 ], function( <%= config.name.camel %> ) {

    describe( '<%= config.name.raw %>/<%= config.name.raw %>', function() {

        it( 'should load without blowing', function() {

            expect( <%= config.name.camel %> ).to.exist

        } )

    } )

} )