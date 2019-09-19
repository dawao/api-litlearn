'use strict';

/**
 * A set of functions called "actions" for `Check`
 */

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
// GET /hello
  find: async ctx => {
        /** const { id } = ctx.params;

    const fields = await strapi.query('check').custom(searchQueries)({
      id,
    });*/

const knexQueryBuilder = strapi.connections.default('check');
knexQueryBuilder.where('agency','=',1);
const resp = await knexQueryBuilder.then();
console.log('Results: ', resp);

    //const fields = strapi.services.check.exampleService(      'welcome@mysite.com',      'Welcome'    );
    ctx.send(resp);
  },
  findOne: async ctx => {
    ctx.send('Hello World!');
  },
};

const searchQueries = {
  bookshelf({ model }) {
    return ({ id }) => {
      return model
        .query(function(qb) {
           qb.where('agency', 1);
        })
        .fetchAll()
        .then(results => results.toJSON());
    };
  },
  mongoose({ model }) {
    return ({ id }) => {
      const re = new RegExp(id);

      return model.find({
        $or: [{ agency: re }, { agency: re }],
      });
    };
  },
};