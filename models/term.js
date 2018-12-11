var db = require('../db/config');
var term = {};

// create a method that gets all the data from the "pokemon" table
term.getAll = function (req, res, next) {
    db.manyOrNone("SELECT * FROM terms;")  // query the database
      .then(function (result) {   // return the data as a javascript object "result"
        res.locals.term = result;  // save that javascript object to the response object in res.locals.pokemon
        next();  // move on to the next command
      })
      .catch(function(error){ // if there is an issue when getting all the pokemon
        console.log(error); // log the error
        next(); // move on to the next command
      })
}
term.find = function (req, res, next) {
    var id = req.params.id;
    db.oneOrNone("SELECT * FROM terms WHERE id = $1;", [id])
      .then(function(result){
        res.locals.term = result;
        next();
      })
      .catch(function(error){
        console.log(error);
        next();
      })
  }

  
term.create = function(req, res, next){
    var termData ={
        name:req.body.name,
        definition: req.body.definition,
    }
    console.log(req.body)
  db.one(
    `INSERT INTO terms (name,definition) VALUES ($1, $2) RETURNING id;`,
    [termData.name, termData.definition,req.params.id])
    .then(function (result) {
      console.log(result)
      res.locals.term_id = result.id;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })

}
module.exports = term;