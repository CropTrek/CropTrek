import User from '../Models/UserModel.js';
import passportJwt from 'passport-jwt';
import GoogleStrategy from 'passport-google-oauth20';
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'yx9TUnTIA^luh&M6z82epT8*NaPg^xBWD!KpDtR&jp2CNeexK&';

const passportConfig = (passport) => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}

const passports = (passport)=>{
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',// This is the URL that Google will redirect to after authentication is complete
        
    },
      async(accessToken, refreshToken, profile, done)=> {
        // This function will be called after the user has authenticated via Google and their profile has been retrieved
        // You can perform any necessary operations here, such as saving the user's profile to a database
        console.log(profile)
        const newUser={
            name : profile.name.givenName,
            surname: profile.name.familyName,
            profilePhoto:profile.photos[0].value,
            googleId : profile.id,
            email : profile.emails[0].value,
            role: 'farmer',
        }
        try {
let user = await User.findOne({googleId:profile.id})
if (user){
    done(null,user)
}else {
    user= await User.create(newUser)
    done(null,user)
}

        }catch(err){
            console.error(err)
        }
      }
      ));
      passport.serializeUser((user,done)=>{
      done(null,user.id)
      
      })
      passport.deserializeUser((id,done)=>{
      User.findById(id,(err,user)=> done(err,user))
      })

}

export {passportConfig,passports};