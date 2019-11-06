//initialize middleware variables
const express = require('express');
const app = express();

const { data } = require('./data.json');


//Add static assets
app.use(express.static('public'));

//Set 'view engine' to pug
app.set('view engine', 'pug');

//establish route variables
const index = require('./routes')
const about = require('./routes/about');

//Set up index route
app.use(index);
app.use(about);

//start server
app.listen(3000, () => {
    console.log('Running on localhost:3000!')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  module.exports = app;