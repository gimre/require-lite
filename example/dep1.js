'use strict'

define( 'dep1', [ 'common/dep3' ], ( dep3 ) => `dep1 ${ dep3 }` )