const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 1. Pass all recipe data to 'index' template
  res.render('index', { projects });
});

/* GET recipe page. */
router.get('/recipes/:id', function(req, res, next) {
  const projectId = req.params.id;
  const project = project.find( ({ id }) => id === +projectId );
  
  if (project) {
    // 2. Pass the recipe data to the 'recipe' template
    res.render('project', { projects });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;