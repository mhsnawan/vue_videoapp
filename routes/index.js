var express = require('express');
var connect = require('../utils/sqlConnect');
var router = express.Router();
var aync = require('async');

/* GET home page. */
router.get('/', (req, res, next) => {
  // do an SQL query to get all of the movies, including genre
  connect.query(`SELECT * FROM tbl_movies m, tbl_genre g, tbl_mov_genre mg WHERE m.movies_id = mg.movies_id AND g.genre_id = mg.genre_id`, (error, rows)=> {
    if (error) {
      throw error;
    } else {
      res.render('home', {
        defaultMovie : rows[Math.floor(Math.random() * rows.length)],
        data : JSON.stringify(rows),
        mainpage : true,
        videopage : false
      });
    }
  })
});

router.get('/movies/:id/:vidsrc', (req, res) => {
  console.log(req.params.id, req.params.vidsrc)
  //Getting movies details and comments through id
 connect.query(`SELECT * FROM tbl_comments c ,tbl_movies m, tbl_mov_genre mg WHERE c.comments_movie = ${req.params.id} AND m.movies_id = ${req.params.id} AND mg.movies_id = ${req.params.id}`, (err, rows)=> {
    data = JSON.stringify(rows);
    var movie_data = {
      title : rows[0].movies_title,
      description : rows[0].movies_storyline,
      genre : rows[0].movies_genre
    };
    if (err) {
      console.log(err);
    } 

    else {
        res.render('movie', {
        movie : req.params.id,
        trailer : req.params.vidsrc,
        movie_data : movie_data,
        data : JSON.stringify(rows),
        mainpage : false,
        videopage: true
      });
    }
  });
});



module.exports = router;
