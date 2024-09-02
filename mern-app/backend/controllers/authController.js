import passport from "passport";
import jwt from "jsonwebtoken";

const loginSuccess = (req, res) =>{
  if(req.user){ 
    res.status(200).json({
      error: false,
      message: "Successfuylly Loged in",
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        googleId: req.user.googleId,
        profileImage: req.user.profileImage,
        displayName: req.user.displayName,
    })
  }else{
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};

const loginFailed = (req, res) =>{
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
};

// Start Google OAuth 2.0 flow
const googleAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
};

// Google OAuth 2.0 callback
const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", { 
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: '/auth/login/failed'
     },
    //  (err, user, info) => {
    // if (err) return next(err);
    // if (!user) return res.redirect("/");

    // const token = jwt.sign({ id: user._id }, 'jwt', { expiresIn: "1h" });
    // res.redirect(`${process.env.FRONTEND_URL}/profile?token=${token}`);
  )(req, res, next);
};


// const profile = (req, res) => {
  
//   const token = req.query.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   jwt.verify(token, 'jwt', (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Failed to authenticate token" });
//     }

//     if (!req.user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       id: decoded.id,
//       email: req.user.email,
//       name: `${req.user.firstName} ${req.user.lastName}`,
//     });
//   });
// };


const logout = (req, res) => {
  
  req.logout((err) => {
    if(err) {
      return res.status(500).json({ error: true, message: "Failed to logout" });
    }
    req.session.destroy((err) =>{
      if(err){
        console.log("Failed to destroy session:", err);
      } else {
        console.log("Session destroyed successfully");
      }
      res.clearCookie('connect.sid', { path: '/'});
      res.redirect(process.env.FRONTEND_URL);
    });
  });
};

export { googleAuth, googleAuthCallback, loginSuccess, loginFailed, logout };
