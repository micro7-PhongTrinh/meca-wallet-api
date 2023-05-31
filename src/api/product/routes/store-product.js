module.exports = {
    routes: [{
        method: 'GET',
        path: '/store-product',
        handler: 'product.findByStore'
    }]
}