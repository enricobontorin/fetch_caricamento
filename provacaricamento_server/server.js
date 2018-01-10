/*globals require, console, process */

var express = require('express');
var bodyParser = require('body-parser');


// instantiate express
const app = express();


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8080;


// get an instance of the express Router
var router = express.Router();

var assignmentArray = [];


// route /bears
router.route('/assignmentload')

    // create a assignment
    // accessed at POST http://localhost:8080/api/assignmentload
    .post(function (req, res) {
        // create a new instance of the Assignment model
        var assignment =  {};

        // set the assignment name (comes from the request)
        if(req.body.matricola) assignment.matricola = req.body.matricola;
        if(req.body.heroku) assignment.heroku = req.body.heroku;
        if(req.body.github) assignment.github = req.body.github;
        if(req.body.apiary) assignment.apiary = req.body.apiary;
        // save the bear and check for errors
        assignmentArray.push(assignment)
        res.status(200)
        res.json(assignment)

    })

    // get all the assignment
    // accessed at GET http://localhost:8080/api/assignment
    .get(function (req, res) {
      res.status(200)
      res.json(assignmentArray)
    });



// middleware route to support CORS and preflighted requests
app.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    }
    // make sure we go to the next routes
    next();
});

// register our router on /api
app.use('/api', router);

// handle invalid requests and internal error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});


app.listen(port);
console.log('Magic happens on port ' + port);
