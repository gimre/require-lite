'use strict'

define( 'game', [ 'dep1', 'dep2' ], ( dep1, dep2 ) => ( {
    start: ( element ) => console.log( 'game started on ', element, dep1, dep2 )
} ) )