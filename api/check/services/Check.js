'use strict';

/**
 * `Check` service.
 */

module.exports = {
    async  exampleService(params, arg2)  {
        //const result = await strapi.query('check').model.query(qb => {
         //   qb.where('agency', 1);
        //}) .fetch();
    const { id } = params;

    const data = await strapi.query('check').custom(searchQueries)({
      id,
    });
     return data + arg2;
  }
  // exampleService: (arg1, arg2) => {
  //   return isUserOnline(arg1, arg2);
  // }
     

    //const fields = result.toJSON();
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