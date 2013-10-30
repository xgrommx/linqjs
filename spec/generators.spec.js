describe( ".select()", function()
{
    it( "should return the result from the selector", function()
    {
        var e = from([ 1, 2, 3 ]).select( function( x ) {
            return x * x;
        });
        expect( e.array() ).toEqual([ 1, 4, 9 ]);
    });

    it( "should throw an error if selector is missing", function()
    {
        var e = from();
        expect( function()
        {
            e.select();
        }).toThrow();
    });
});

describe( ".where()", function()
{
    it( "should filter the enumeration", function()
    {
        var e = from([ 1, 2, 3, 4 ]).where( function( x ) {
            return x % 2 === 0;
        });
        expect( e.array() ).toEqual([ 2,4 ]);
    });
});

describe( ".take()", function()
{
    it( "should take the first 'x' number of items", function()
    {
        expect( from([ 1, 2, 3 ]).take( 2 ).array() ).toEqual([ 1,2 ]);
    });
});

describe( ".skip()", function()
{
    it( "should skip the first 'x' number of items", function()
    {
        expect( from([ 1, 2, 3 ]).skip( 2 ).array() ).toEqual([ 3 ]);
    });
});

describe( ".step()", function()
{
    it( "should skip every other 'x' item", function()
    {
        expect( from([ 1, 2, 3 ]).step( 2 ).array() ).toEqual([ 1,3 ]);
    });
});

describe( ".groupBy()", function()
{
    it( "should group items by key", function()
    {
        var items = [{
            fruit: "lime",
            color: "green"            
        }, {
            fruit: "apple",
            color: "red"
        }, {
            fruit: "watermelon",
            color: "green"
        }, {
            fruit: "blueberry",
            color: "blue"
        }];

        expect( from( items ).groupBy( "|x| x.color" ).array() ).toEqual(
        [{
            key: "green",
            items: [{
                fruit: "lime",
                color: "green"
            }, {
                fruit: "watermelon",
                color: "green"
            }]
        }, {
            key: "red",
            items: [{
                fruit: "apple",
                color: "red"
            }]
        }, {
            key: "blue",
            items: [{
                fruit: "blueberry",
                color: "blue"
            }]
        }]);
    });

    it( "should throw an error if selector is missing", function()
    {
        var e = from();
        expect( function()
        {
            e.groupBy();
        }).toThrow();
    });
});

describe( ".union()", function()
{
    it( "should join two enumerables", function()
    {
        expect( from([ 1, 2, 3 ]).union([ 4, 5, 6 ]).array() ).toEqual([ 1, 2, 3, 4, 5, 6 ]);
    });
});

describe( ".orderBy()", function()
{
    it( "should sort the items by the specified key", function()
    {
        expect( from([ 3, 1, 2 ]).orderBy( "|x| x" ).array() ).toEqual([ 1, 2, 3 ]);
    });

    it( "should provide a .thenBy() method", function()
    {
        expect( from().orderBy( "|x| x" ).thenBy ).toBeDefined();
    });

    it( "should provide a .descending() method", function()
    {
        expect( from().orderBy( "|x| x" ).descending ).toBeDefined();
    });
});

describe( ".thenBy()", function()
{
    it( "should add another sort to the enumerable", function()
    {
        var data = [{
            first: "Susan",
            last: "Smith"
        }, {
            first: "Sally",
            last: "White"
        }, {
            first: "Adam",
            last: "Smith"
        }, {
            first: "Fred",
            last: "Jones"
        }];
        expect( from( data ).orderBy( "|x| x.last" ).thenBy( "|x| x.first" ).array() ).toEqual(
        [{
            first: "Fred",
            last: "Jones"
        }, {
            first: "Adam",
            last: "Smith"
        }, {
            first: "Susan",
            last: "Smith"
        }, {
            first: "Sally",
            last: "White"
        }]);
    });

    it( "should throw an error if selector is missing", function()
    {
        var e = from().orderBy( "|x| x" );
        expect( function()
        {
            e.thenBy();
        }).toThrow();
    });
});

describe( ".descending()", function()
{
    it( "should reverse the sort order", function()
    {
        expect( from([ 1, 2, 3 ]).orderBy( "|x| x" ).descending().array() ).toEqual([ 3, 2, 1 ]);
    });
});
