'use strict';

/**
 * activity controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::activity.activity', ({strapi}) => ({
    async findLately(ctx) {
        const {userId} = ctx.state.user;

        var {results} = await strapi.service('api::activity.activity').find({
            where: {user: userId},
            populate: {
                        member_card: {
                            populate: {
                                store: true
                    }
                }
            },
            sort: [{ date: 'desc' }],
        });

        var activities = results.slice(0,5).map(e => {
            return {
                id: e.id,
                content: e.content,
                date: e.date,
                point: e.point,
                storeName: e.member_card.name,
                logoUrl: e.member_card.imgUrl
            }
        })

        ctx.body = {
            data: activities
        }
    },

    async findByMemberCard(ctx) {
        const {userId} = ctx.state.user;
        const {cardId} = ctx.request.query;

        console.log('wkfhjwkefjh');
        console.log(cardId);

        var results = await strapi.entityService.findMany('api::activity.activity', {
            where: {user: userId},
            filters: {
                member_card: {
                        id: {
                            $eq: cardId
                        }
                }
            },
            populate: {
                        member_card: {
                            populate: {
                                store: true
                    }
                }
            },
            sort: [{ date: 'desc' }],
        });
        
        var activities = results.map(e => {
            return {
                id: e.id,
                content: e.content,
                date: e.date,
                point: e.point,
                storeName: e.member_card.name,
                logoUrl: e.member_card.imgUrl
            }
        })
        
        console.log(activities);

        ctx.body = {
            data: activities
        }
    }
}));
