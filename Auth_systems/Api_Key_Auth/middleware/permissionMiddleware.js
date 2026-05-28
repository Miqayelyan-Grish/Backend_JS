export const permissionMiddleware = (reqPermission) => {
  return (req, res, next) => {
    const hasPermission = req.client.permissions.includes(reqPermission);

    if (!hasPermission) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
};
