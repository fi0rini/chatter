'use strict';

const express = require('express');
const app = express()
const http = require('http').Server(app);
const path = require('path');
const assign = require('object-assign');

const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const GOOGLE_CONSUMER_KEY = "114197354293-68r595gj0uqkmrshrs4t752p88ub3nm4.apps.googleusercontent.com";
const GOOGLE_CONSUMER_SECRET = "ut4cLm727TSiNqX2JrJ23-kM";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj,done) => done(null, obj));

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CONSUMER_KEY,
        clientSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: 'http://127.0.0.1:3000/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            console.log(profile);
            done(null, profile)
        });
    }
));

module.exports = function (config) {
    // configure static directories
    app.use(express.static(config.public));
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }));

    app.use((req, res, next) => {
        var sess = req.session;
        console.log(sess);
        next();
    });

    // initialize passport
    app.use(passport.initialize());
    app.use(passport.session());


    app.get('/', (req, res) => {
        let passport  = req.session.passport;
        if (passport && passport.user)
            res.sendFile(config.index);
        else
            res.redirect('/login');
    });

    app.get('/login', (req, res) => res.sendFile(config.login));

    app.get('/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
        (req,res) => {
            res.redirect('/')
        }
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/?fail=1' }),
        (req,res) => {
            res.redirect('/')
        }
    );

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    http.listen(config.port, function(){
      console.log('listening on *:' + config.port);
    });

    return { http };
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}
