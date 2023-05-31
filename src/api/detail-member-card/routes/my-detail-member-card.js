module.exports = {
    routes: [{
        method: 'GET',
        path: '/my-detail-member-card/store',
        handler: 'detail-member-card.findDetailByStore'
    },
    {
        method: 'GET',
        path: '/my-detail-member-card/member-card',
        handler: 'detail-member-card.findDetailByMemberCard'
    },
    {
        method: 'POST',
        path: '/my-detail-member-card/store',
        handler: 'detail-member-card.createDetail'
    }]
}