'use strict'

const cache = new Map( )

const load = ( id ) => new Promise( ( y, n ) => {
    const loader = document.createElement( 'script' )
    loader.onerror = () => n( new Error( `couldn't find ${ id }` ) )
    loader.onload = y
    loader.src = './' + id + '.js'

    document.body
        .appendChild( loader )
        .remove( )
} )

const resolve = ( ids = [ ] ) => {
    const instances = ids.map( id => {
        if( cache.has( id ) ) {
            return cache.get( id ).instance
        }
        return load( id ).then( ( ) => {
            const cached = cache.get( id )
            const { dependencies, factory, instance } = cached
            return cached.instance = instance ?
                instance : resolve( dependencies )
                    .then( resolved => factory( ... resolved ) )
        })
    })
    return Promise.all( instances )
}

Object.assign( window, {
    define: ( id, dependencies, factory ) => {
        if( ! cache.has( id ) ) {
            cache.set( id, { dependencies, factory } )
        }
    },
    require: ( ...args ) => {
        const [ callback, ...dependencies ] = args.reverse( )
        resolve( dependencies.reverse( ) )
            .then( resolved => callback( ... resolved ) )
    }
})