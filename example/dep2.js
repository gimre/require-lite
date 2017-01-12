'use strict'

define( 'dep2', [ 'common/dep3' ], ( dep3 ) => `dep2 ${ dep3 }` )