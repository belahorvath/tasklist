var mysql = require('mysql');
var connection;

function openDB(){
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "testPasswort",
    database: "tasklist",
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
}

function getAllProject(err,callback){
  connection.query("SELECT * FROM projekt", function(err, results) {
    if(!err){
      console.log('Query successfull.');
      //res.status(200).send(results);
      callback(0, results);
    }else{
      console.log('ERROR while.', err);
      callback(1, err);
    }
  });
}

function getIssuesOfProject(id, callback){
  connection.query("SELECT * FROM issue WHERE projektID ='" + id + "'", function(err, results){
    if(!err){
      console.log('Query successfull.');
      callback(0,results);
    }else{
      console.log('Error while performing the Query.', err);
      callback(1, err);
    }
  });
}

function updateProject(id, callback){
  connection.query("UPDATE projekt SET active = '1' WHERE clientId ='" + id +"'", function(err, results) {
    if(!err){
      console.log('Query successfull.');
      callback(0, results);
    }else{
      console.log('Error while performing the Query.', err);
      callback(1, err);
    }
  });
}


module.exports = {
    //close: closeDB,
    open: openDB,
    //insertProject: insertProject,
    updateProject: updateProject,
    //removeProject: removeProject,
    //insertIssue: insertIssue,
    //updateIssue: updateIssue,
    //removeIssue: removeIssue,
    getAllProject: getAllProject,
    getIssues: getIssuesOfProject
}
