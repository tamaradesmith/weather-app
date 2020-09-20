const UserQuery = require('../db/queries/userQuery')


module.exports = {
 async ensureLoggedIn(req, res, next) {
    if (req.signedCookies.user_id) {
      next();
    } else {
      res.status(401);
      next(new Error('Un-Authorized'));
    };
  },
  async isAdmin(id){
    id = id || await UserQuery.getDefaultUser();
   const user = await UserQuery.getOne(id);
   return user[0].is_admin;
  }
};