const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Employee = require("../models/Employee");

console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  const employee = await Employee.findById(id);

  if (user) {
    done(null, user);
  }

  if (employee) {
    done(null, employee);
  }
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser = await new User({
          googleId: profile.id,
          givenName: profile.name.givenName,
          familyName: profile.name.familyName,
          email: profile.emails[0].value,
          role: "business",
          picture: profile.photos[0].value,
        }).save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "google-employee",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback/employee",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const employee = await Employee.findOne({ googleId: profile.id });

      if (employee) {
        done(null, employee);
      } else {
        const employee = await new Employee({
          googleId: profile.id,
          givenName: profile.name.givenName,
          familyName: profile.name.familyName,
          email: profile.emails[0].value,
          role: "employee",
          picture: profile.photos[0].value,
          shops: [],
          salary: null
        }).save();
        done(null, employee);
      }
    }
  )
);
