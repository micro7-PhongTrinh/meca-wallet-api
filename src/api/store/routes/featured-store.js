module.exports = {
    routes: [{
        method: 'GET',
        path: '/featured-store',
        handler: 'store.findFeatured'
    },{
        method: 'GET',
        path: '/suggest-store',
        handler: 'store.findSuggest'
    },
    {
        method: 'GET',
        path: '/filtered-store',
        handler: 'store.findFiltered'
    }]
}