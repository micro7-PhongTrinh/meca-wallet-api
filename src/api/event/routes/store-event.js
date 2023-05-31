module.exports = {
    routes: [{
        method: 'GET',
        path: '/store-event',
        handler: 'event.findByStore'
    },
    {
        method: 'GET',
        path: '/featured-event',
        handler: 'event.findFeatured'
    }]
}