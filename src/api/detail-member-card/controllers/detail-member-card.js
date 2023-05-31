'use strict';

/**
 * detail-member-card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::detail-member-card.detail-member-card', ({strapi}) => ({
    async findFeature(ctx) {
        //tim 3 the va tra ve tong so the dang so huu
        const {userId} = ctx.state.user;

        var {results} = await strapi.service('api::detail-member-card.detail-member-card').find({
            where: {user: userId},
            populate: {
                member_card: {
                    populate: {
                        store: true
                    }
                },
            }
        });

        results = Array.from(results);

        console.log(results);

        ctx.body = {
            total: results.length,
            data: results.slice(0, 3)
        }
    },

    async findAll(ctx) {
        const {userId} = ctx.state.user;

        var {results} = await strapi.service('api::detail-member-card.detail-member-card').find({
            where: {user: userId},
            populate: {
                member_card: {
                    populate: {
                        store: true
                    }
                },
            }
        });

        results = Array.from(results);

        console.log(results);

        ctx.body = results;
    },

    async findDetailByStore(ctx) {
        const {user} = ctx.state.user;
        const {storeId} = ctx.request.query

        const results = await strapi.entityService.findMany('api::detail-member-card.detail-member-card', {
            where: {user: user},
            filters: {
                member_card: {
                    store: {
                        id: {
                            $eq: storeId
                        }
                    }
                }
            },
            populate: {
                member_card: {
                    store: true
                }
            }
        });

        const store = await strapi.entityService.findOne('api::store.store', storeId);

        if (results.length != 0) {
            results[0].member_card.store = store
        }

        ctx.body = results[0];
    },

    async findDetailByMemberCard(ctx) {
        const {user} = ctx.state.user;
        const {cardId} = ctx.request.query

        const results = await strapi.entityService.findMany('api::detail-member-card.detail-member-card', {
            where: {user: user},
            filters: {
                member_card: {
                        id: {
                            $eq: cardId
                        }
                }
            },
            populate: {
                member_card: true,
                createdBy: true
            }
        });

        ctx.body = results[0];
    },

    async createDetail(ctx) {
        const {user} = ctx.state.user;
        const {storeId} = ctx.request.query
        
        const store = await strapi.entityService.findOne('api::store.store', storeId, {
            populate: {
                member_card: {
                    store: true
                }
            }   
        });

        var results = await strapi.entityService.create('api::detail-member-card.detail-member-card', {
            data: {
                point: 0,
                user: ctx.state.user,
                openDate: new Date().toISOString(),
                member_card: store.member_card
            },
            populate: {
                member_card: {
                    store: true
                },
            }
        });

        var activity = await strapi.entityService.create('api::activity.activity', {
            data: {
                content: 'Mở thẻ thành công',
                date: new Date().toISOString(),
                user: ctx.state.user,
                point: 0,
                member_card: results.member_card
            }
        });

        results.member_card.store = store;
        
        ctx.body = results;
    }
}));
