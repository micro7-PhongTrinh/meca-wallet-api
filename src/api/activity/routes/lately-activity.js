module.exports = {
    routes: [{
        method: 'GET',
        path: '/lately-activity',
        handler: 'activity.findLately'
    },
    {
        method: 'GET',
        path: '/activity/member-card',
        handler: 'activity.findByMemberCard'
    }]
}