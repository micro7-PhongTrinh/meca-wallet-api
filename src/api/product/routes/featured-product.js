module.exports = {
    routes: [{
        method: 'GET',
        path: '/featured-product',
        handler: 'product.findFeatured'
    }]
}