import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/users.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
      scope: ['profile', 'email'] 
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            profileImage: profile.photos[0].value,
            displayName: profile.displayName,
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, false); 
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize the user ID for session management
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    
    // Pass user object to done callback
    return done(null, user);
  } catch (error) {
    // Pass error to done callback
    return done(error, false);
  }
});

export default passport;
