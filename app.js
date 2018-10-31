const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
var bodyParser = require('body-parser')
const port = 3000

let moviePosts = []
let filteredPosts = moviePosts
let detailedMovies = moviePosts

app.engine('mustache',mustacheExpress())

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine','mustache')

app.listen(port, () => console.log(`Server is running...`))

app.get('/', (req, res) => res.redirect('/movies'))

app.set('views','./views')


app.post('/add-movies',function(req,res){

  let movieName = req.body.movieName
  let movieYear = req.body.movieYear
  let movieGenre = req.body.movieGenre
  let movieDescription = req.body.movieDescription
  let movieImgURL = req.body.movieImgURL

  moviePosts.push({ movieName : movieName, movieImgURL : movieImgURL, movieYear : movieYear, movieGenre : movieGenre, movieDescription : movieDescription})

  res.redirect('/movies')
})
app.get('/add-movies', function(req,res){
  res.render('add-movies')
})

app.get('/movies', function(req,res){

  res.render('movies', { moviePostsElement : filteredPosts})
})

app.post('/delete-movie',function(req,res){

    let name = req.body.movieName

    moviePosts = moviePosts.filter(function(movie){
      return movie.movieName != name
    })
    res.redirect('/movies')
})

app.get('/movies/:genre',function(req,res){
  let genre = req.params.genre

  if(genre == 'all'){
    filteredPosts = moviePosts
  } else {
  filteredPosts = moviePosts.filter(function(movie){
    return movie.movieGenre == genre

  })}
  res.redirect('/movies')
})


//having a hard time getting this to work

// app.get('/movie-details', function(req,res){
//   res.render('movie-details', { moviePostsElement : detailedMovies})
// })
//
// app.get('/movies/name/:detailMovieName', function(req,res){
//   let detailMovieName = req.param.detailMovieName
// 
//   detailedMovies = moviePosts.filter(function(movie){
//     return movie.movieName == detailMovieName
//
//   })
//   res.redirect('/movies-details')
//
// })
