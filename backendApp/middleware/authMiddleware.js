const roles = require('../roles');

function checkRole(requiredRole) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (roles.indexOf(userRole) >= roles.indexOf(requiredRole)) {
      // User has the required role
      next();
    } else {
      // User doesn't have the required role
      res.status(403).json({ message: 'Unauthorized' });
    }
  };
}

module.exports = checkRole;