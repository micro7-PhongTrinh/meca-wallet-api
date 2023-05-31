'use strict';

/**
 * store controller
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

module.exports = createCoreController('api::store.store', ({strapi}) => ({
    async findFeatured(ctx) {
        var {results} = await strapi.service('api::store.store').find();
        results = Array.from(results);
        shuffle(results);
        try {
            ctx.body = results.slice(0, 3);
          } catch (err) {
            ctx.body = err;
          }
    },

    async findSuggest(ctx) {
      var {results} = await strapi.service('api::store.store').find();
      results = Array.from(results);

      try {
          ctx.body = results.slice(0, 6);
        } catch (err) {
          ctx.body = err;
        }
  },

  async findFiltered(ctx) {
    const {search} = ctx.request.query;

    var results = await strapi.entityService.findMany('api::store.store', {
      filters: {
        $or: [
          {
            name: {
              $containsi: search
            }
          },
          {
            location: {
              $containsi: search
            }
          },
        ]
      },
  });


    results = Array.from(results);

    console.log(results);

    try {
        ctx.body = results.slice(0, 10);
      } catch (err) {
        ctx.body = err;
      }
}
}));

