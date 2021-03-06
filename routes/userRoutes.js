const { User } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const BCRYPT_SALT_ROUNDS = 12;
const bcrypt = require('bcrypt')
module.exports = app => {
  // always use a post route for login because get routes dont have a req body

  // Register new user
  app.post('/users', (req, res) => {
      const { name, email, username, links, bio, pfPic, cityState, instruments, skills, profile, resetPasswordToken, resetPasswordExpires, password, friends, request, pending } = req.body
      // changed password functionality
      
      bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
        
        if (password === '') {
          res.send('password cant be left blank')
        } else if (password.length <= 3){
          res.send('need more')
        } else {
        User.create({
          name, email, username, links, bio, pfPic, cityState, instruments, skills, profile, password: hashedPassword, friends, request, pending
        })
        .then(() => res.sendStatus(200))
        .catch(e => {
          if (e) {
            res.json({ success: false, message: "Your account could not be saved. Error: ", e})
          }
          
        })
        }
      })
     
      // User.register(new User({ name, email, username, links, bio, pfPic, cityState, instruments, skills, profile }), req.body.password, e => {
      //   if (e) {
      //     res.json({ success: false, message: "Your account could not be saved. Error: ", e})
      //   }
      //   res.sendStatus(200)
      // })
  })

  // GET MY PROFILE INFO (when logged in)
  app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.user)
    const { _id } = req.user
    User.findById(_id)
      .then(user => res.json(user))
      .catch(e => console.error(e))
  })

  // EDIT MY PROFILE INFO (when logged in)
  app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
  })

  // Login route
  app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username })
      .then(user => {
        if (user === null) {
          console.log('no user')
          res.sendStatus(200)
          return
        }
        bcrypt.compare(req.body.password, user.password).then(response => {
          if (response !== true) {
            console.log('passwords do not match')
            res.sendStatus(200)
            return 
          }
          console.log('user found & authenticated')
          res.json({
            token: jwt.sign({ id: user._id }, process.env.SECRET)
          })
          return 
        })
      })

    // User.authenticate()(req.body.username, req.body.password, (e, user) => {
    //   if (e) {
    //     console.log(e)
    //   }
    //   if (user) {
    //     res.json({
    //       token: jwt.sign({ id: user._id }, process.env.SECRET)
    //     })
    //   } else {
    //     res.sendStatus(200)
    //   }
    // })
  })
  
}
