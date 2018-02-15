var express = require('express');
var bodyParser = require('body-parser')
var validator = require('express-validator')
var app = express();
var cors = require('cors')
const { Available } = require('./models')
const { User } = require('./models')


app.use(express.static('public'))
app.use(validator())
app.use(bodyParser.json())
app.use(cors())

const authorization = function(request , response, next){
	const token = request.query.authToken || request.body.authToken
	if(token){
		User.findOne({
			where: {authToken: token}
		}).then((user)=>{
		  if(user){
			  request.currentUser = user
			  next() 
		 	}else{
			 response.status(401)
			 response.json({message: 'Authorization Token Invalid'})
			  }
		    })
		}else{
			response.status(401)
			response.json({message: 'Authorization Token Required'})
		}
	}


app.get('/', (req, res) => {
	res.json({message: 'API Example App'})
});

app.get('/availabilities', (req, res) => {
	Available.findAll().then( (availabilities) =>{
		res.json({availabilities:availabilities})
	})
})


app.post('/availabilities', (req, res) => {
		req.checkBody('loa', 'Is required').notEmpty()
		req.checkBody('kind', 'Is required').notEmpty()
		req.checkBody('location', 'Is required').notEmpty()
		req.checkBody('description', 'Is required').notEmpty()

	req.getValidationResult()
	  .then((validationErrors) =>{
		if(validationErrors.isEmpty()){
	  Available.create({
	    loa: req.body.loa,
	    kind: req.body.kind,
	    location: req.body.location,
		description: req.body.description
	}).then((available)=>{
	    res.status(201)
	    res.json({available: available})
	 })
	  	}else{
		res.status(400)
		res.json({errors: {validations: validationErrors.array()}})
	  }
	})
})

//Begins 'get' and 'post' process for /users route path.

app.get('/users', (req, res) => {
		User.findAll().then( (users) =>{
			res.json({users: users})
		})
})

app.post('/users', (req, res) => {
		req.checkBody('firstname', 'Is required').notEmpty()
		req.checkBody('lastname', 'Is required').notEmpty()
		req.checkBody('email', 'Is required').notEmpty()
		req.checkBody('password', 'Is required').notEmpty()
		req.checkBody('phone', 'Is required').notEmpty()

	req.getValidationResult()
	  .then((validationErrors) =>{
		if(validationErrors.isEmpty()){
	  User.create({
	    firstname: req.body.firstname,
	    lastname: req.body.lastname,
	    email: req.body.email,
		password: req.body.password,
		phone: req.body.phone
	}).then((user)=>{
	    res.status(201)
	    res.json({user: user})
		})
	  }else{
		res.status(400)
		res.json({errors: {validations: validationErrors.array()}})
	  }
	})
})



module.exports = app
