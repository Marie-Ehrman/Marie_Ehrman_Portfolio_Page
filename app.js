//variables to require the necessary dependencies
const express = require('express');
const path = require('path');
const app = express();

//grab data from data.json file and set it to the projects object
const { projects } = require('./data.json');

//set up Static Route to serve 'public' folder
app.use('/static', express.static(path.join(__dirname, 'public')));

//set “view engine” to pug
app.set('view engine', 'pug');

    //**************ROUTES*****************//

/***** INDEX ROUTE *****/
app.get('/', (req, res, next) => {
    //render the index pug template passing it the projects object
    res.render('index', { projects });
});

/***** ABOUT ROUTE *****/
app.get('/about', (req, res, next) => {
    //render the about pug template 
    res.render('about');
});

/***** PROJECT ROUTE *****/
//Dynamic "project" routes based on the id of the project that render a 
//customized version of the Pug project template to show off each project.
//Which means adding data, or "locals", as an object that contains data to be passed to the Pug template
app.get('/projects/:id', (req, res, next) => {
    
    //stores the id with a route parameter
    const projectId = req.params.id;
    //holds the recipe object to pass to the view
    const project = projects.find( ({ id }) => id === +projectId );
    //redirect to about page, if Learn More is clicked in projects?


    if (project) {
        //render the project pug template passing it the project object
      res.render('project', { project });
    } else {
    //if route doesn't exist pass status 404 to 404 middleware
      res.sendStatus(404);
      console.log("Route does not exist");
    }
});


/**** ERROR HANDLING ****/

//this handles a 404 not found error, it is placed here to catch other errors before the application ends
app.use((req, res, next) => {
    console.log("Route does not exist");
    const err = new Error("Not Found!");
    err.status = 404;
    next(err);
});

//handles other errors and renders the error pug template
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});


//run the local host server
app.listen(3000, () => {
    console.log('Application running on localhost:3000!')
});