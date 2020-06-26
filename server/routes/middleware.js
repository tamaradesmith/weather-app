
module.exports = {
 async ensureLoggedIn(req, res, next) {
    console.log("ensureLoggedIn -> req.signedCookies", !req.signedCookies);
    if (req.signedCookies.user_id) {
      next();
    } else {
      res.status(401);
      next(new Error('Un-Authorized'));
    };
  }
};