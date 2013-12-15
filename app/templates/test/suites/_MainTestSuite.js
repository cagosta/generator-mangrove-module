define( [
    '<%= moduleName%>/<%=moduleName%>'
 ], function(<%= moduleName %>) {

    return function() {

        describe( '<%= moduleName %>/<%= moduleName%>', function() {

            it( 'should load without blowing', function() {
                expect(<%=moduleName%>).to.exist
            } )

        } )

    }


} )