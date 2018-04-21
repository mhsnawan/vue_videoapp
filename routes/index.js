var express = require('express');
var connect = require('../utils/sqlConnect');
var router = express.Router();
var aync = require('async');
var share = require('social-share');
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
  });
});
router.get('/posttw',(req,res)=>{
  var url = share('twitter', {
    title: 'share it'
  });
  res.redirect(url);
});
router.get('/movies/:id/:genre_id/:vidsrc', (req, res) => {
  console.log(req.params.id, req.params.vidsrc)
  //Getting movies details and comments through id
  connect.query(`SELECT * FROM tbl_comments c WHERE comments_movie = ${req.params.id}`, (err, rows)=> {
    var movie_data;
    if (err) {
      console.log(err);
    } 
    else {
      connect.query(`SELECT * FROM tbl_movies WHERE movies_id = ${req.params.id}`, (err, rows1)=> {
        if (err) {
          console.log(err);
        } 
        else {
              movie_data = {
              title : rows1[0].movies_title,
              description : rows1[0].movies_storyline,
              genre : rows1[0].movies_genre,
              genre_id : req.params.genre_id
          };
          connect.query(`SELECT * FROM tbl_mov_genre WHERE genre_id = ${req.params.genre_id}`, (err, rows2)=> {
            if (err) {
              console.log(err);
            } 
            else {
              var getmoviesname= [];
              var getmoviesconver={};
              for(var i=0; i<rows2.length; i++){
                getmoviesname.push(rows2[i].movies_id);
              }
              var q1 = 'SELECT * FROM tbl_movies WHERE movies_id IN ('+getmoviesname+ ')';
              connect.query(q1, (err, rows3)=> {
                if (err) {
                  console.log(err);
                } 
                else {
                  rows3.genre_id = req.params.genre_id;
                  
                  console.log('genre id is : '+req.params.genre_id);
                  res.render('movie', {
                    sociallink:'localhost:8080/movies/'+req.params.id+'/'+req.params.genre_id+'/'+req.params.vidsrc,
                    movie : req.params.id,
                    trailer : req.params.vidsrc,
                    movie_data : movie_data,
                    genre_id : req.params.genre_id,
                    data : JSON.stringify(rows),
                    data1 : rows3,
                    mainpage : false,
                    videopage: true
                  }); 
                }
              }); //end of 4th query
              
            }
          }); //end of 3rd query
            
        }
      }); //end of 2nd query   
    }
  }); //end of 1st query

});



module.exports = router;
