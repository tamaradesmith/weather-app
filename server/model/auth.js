module.exports = {

  validUser(user) {
    const vaildUsername = typeof user.username == 'string' && user.username.trim() != "";
    const vaildPassword = typeof user.password == 'string' && user.password.trim().length >= 6;
    return vaildPassword && vaildUsername;
  },
}