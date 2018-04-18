var express = require('express');
var connect = require('../utils/sqlConnect');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

/* Add review to the comments table*/
router.post('/', (req, res, next) => {
  // do an SQL query to post the review
  connect.query(`INSERT INTO tbl_comments (comments_id, comments_auth, comments_copy, comments_date, comments_movie, comments_rating) VALUES (NULL, NULL, "${req.body.comment}", CURRENT_TIMESTAMP(), "${req.body.id}", "${req.body.stars}");`, (error, rows)=> {
    if (error) {
      throw error;
    } else {
      res.json(rows);
    }
  })
});

router.get('/movies/:id', (req, res) => {
  connect.query(`SELECT * FROM tbl_movies_social_media_links WHERE movies_id = ${req.params.id}`, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      // res.render('movie', {
      //   movie : req.params.id,
      //   data : JSON.stringify(rows),
      //   mainpage : false,
      //   videopage: true
      // });
      res.json(rows)
    }
  })
});

module.exports = router;
