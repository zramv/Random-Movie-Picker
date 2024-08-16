import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



var url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=';

const config={
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjIyZGJmNDU2OGExZDE4NzAzOTYzNDEyODQ0ZmYyZSIsIm5iZiI6MTcyMzYzMzcwNi4zNDQyNTEsInN1YiI6IjY2YmI1NGIwZTAxNWU1ZGY3MjAzMTlhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q28FgYmkhqQA1Dmu5VUGHqsTojpe7AmTU2c3TdEH40k'
  }
}



function numberStars(rate) {
let numberOfStar=5*(rate/10);
  if (numberOfStar > 4.75){
    return "/image/stars/5 star.png";
  }
  else if (numberOfStar > 4.25){
    return "/image/stars/4_5 star.png";
  }
  else if   (numberOfStar > 3.75){
    return "/image/stars/4 star.png";
  }
  else if   (numberOfStar > 3.25){
    return "/image/stars/3_5 star.png";
  }
  else if   (numberOfStar > 2.75){
    return "/image/stars/3 star.png";
  }
  else if   (numberOfStar > 2.25){
    return "/image/stars/2_5 star.png";
  }
  else if   (numberOfStar > 1.75){
    return "/image/stars/2 star.png";
  }
  else if   (numberOfStar > 1.25 ){
    return "/image/stars/1_5 star.png";
  }
  else if   (numberOfStar > 0.75){
    return "/image/stars/1 star.png";
  }
  else if   (numberOfStar > 0.25){
    return "/image/stars/0_5 star.png";
  }
  else if(numberOfStar >= 0){
    return "/image/stars/0 star.png";
  }
};


app.get("/", async (req, res) => {
    let page = Math.floor(Math.random()*500)+1;
    let random_movie = Math.floor(Math.random()*20)+1;
    try {
      const result = await axios.get(url+page,config);
      const movie = result.data.results[random_movie]
      console.log(result.data.results[random_movie]);
      res.render("index.ejs",{
        'title': movie.title,
        'poster': movie.poster_path,
        'stars': numberStars(movie.vote_average),
      });
    } catch (error) {
      res.render("index.ejs",{
      });
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
