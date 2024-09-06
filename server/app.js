require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session")
const passport = require("passport")
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
require("./database/conn");
const userdb = require("./models/userSchema")
const PORT = process.env.connect || 5000;

const clientid = "";
const clientsecret = "";

// used for google authentication(format)
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// convert data in the json format from frontend.
app.use(express.json());

// setup session
app.use(session({
    secret: "",
    resave: false,
    saveUninitialized: true
}))

// setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        console.log("Profile",profile);
        
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                });
                await user.save();
            }
            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
)
)

// serializeUser and deserializeUser are used in storing data of the user.
passport.serializeUser((user,done) => {
    done(null,user);
})

passport.deserializeUser((user,done) => {
    done(null,user);
})

// initial google oauth login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:5173/dashboard",
    failureRedirect:"http://localhost:5173/signup"
}));

app.get("/signup/success",(req,res) => {
    // console.log("Requests: ",req.user);
    
    if (req.user) {
        res.status(200).json({message:"Register",user:req.user})
    } else {
        res.status(400).json({message:"Not register"})
    }
})

app.get("/logout",(req,res,next) => {
    req.logout(function (err) {
        if(err){return next(err)}
        res.redirect("http://localhost:5173")
    })
})

// app.get("/",(req,res)=>{
//     res.status(200).json("server start")
// });

app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`);
})