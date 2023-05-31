'use strict';

/**
 * product controller
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

module.exports = createCoreController('api::product.product', ({strapi}) => ({
    async findFeatured(ctx) {
        var{results} = await strapi.service('api::product.product').find();
        shuffle(results)
        results = Array.from(results).slice(0, 4); 

        await Promise.all(
        results.map(async (item, index) => { 
            const foundItem = await strapi.db.query('api::product.product').findOne({
            where: {
              id: item.id,
            },
            populate: ['store'],
          });
          
          results[index].store = {
            id: foundItem.store.id,
            name: foundItem.store.name,
            logoUrl: foundItem.store.logoUrl,
            imgUrl: foundItem.store.imgUrl,
            location: foundItem.store.location,
            memberNumber: foundItem.store.memberNumber
          };}));

        try {
            ctx.body = results;
          } catch (err) {
            ctx.body = err;
          }
    },

    async findByStore(ctx) {
      const {storeId} = ctx.request.query

      const results = await strapi.entityService.findMany('api::product.product', {
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
  }
}));
