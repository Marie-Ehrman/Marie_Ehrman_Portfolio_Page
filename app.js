//Add variables to require the necessary dependencies.
const express = require('express');
const path = require('path');
const app = express();
//grab data from data.json file
const { projects } = require('./data.json');

//set up static route
app.use(express.static(path.join(__dirname, 'public')));
// app.use('views', path.join(__dirname, 'views'));
// app.use(express.static('public'));
//set your “view engine” to “pug”
app.set('view engine', 'pug');





                //****ROUTES****//

/***** INDEX ROUTE *****/
app.get('/', (req, res, next) => {
    res.render('index', { projects });
});

/***** ABOUT ROUTE *****/
app.get('/about', (req, res, next) => {
    res.render('about');
});

/***** PROJECT ROUTE *****/
//Dynamic "project" routes based on the id of the project that render a 
//customized version of the Pug project template to show off each project. Which means adding data, or "locals", as an object that contains data to be passed to the Pug template
app.get('/projects/:id', (req, res, next) => {
    
    //stores the id with a route parameter
    const projectId = req.params.id;
    //holds the recipe object to pass to the view
    const project = projects.find( ({ id }) => id === +projectId );
    console.log(project);

    if (project) {
      res.render('project', { project });
    } else {
      res.sendStatus(404);
    }
});




/**** ERROR HANDLING ****/

//this handles a 404 not found error, it is placed here to catch other errors before the application ends
app.use((req, res, next) => {
    const err = new Error("Not Found!");
    err.status = 404;
    next(err);
});

//handles other errors and renders the error template
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});


app.listen(3000, () => {
    console.log('Application running on localhost:3000!')
});