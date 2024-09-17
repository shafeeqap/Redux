export const authorizeRole = (role) => {
  try {
    return (req, res, next) => {
      console.log(req.user, 'authorizeRole')
      
      if (req.user.role !== role) {
        return res.status(403).json({ message: "Forbidden: You do not have the correct role" });
    }
      next();
    };
  } catch (error) {
    console.log(error);
    
  }
};
