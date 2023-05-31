'use strict';

/**
 * event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

module.exports = createCoreController('api::event.event',  ({strapi}) => ({
    async findByStore(ctx) {
        const {storeId} = ctx.request.query

        const results = await strapi.entityService.findMany('api::event.event', {
            filters: {
                    store: {
                        id: {
                            $eq: storeId
                        }
                    }
            },
            populate: {
                    store: true
            }
        });

        ctx.body = results;
    },

    async findFeatured(ctx) {
        var results = await strapi.entityService.findMany('api::event.event', {
            populate: {
                    store: true
            }
        });

        shuffle(results)
        results = Array.from(results).slice(0, 3); 

        ctx.body = results;
    }
}));
