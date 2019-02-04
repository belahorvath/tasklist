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

function insertProject(project, callback){
  connection.query("INSERT INTO projekt (title, active, clientId) VALUES ('" + project.title + "'," + 1 + ",'" + project.client_id + "')", function(err, results){
    if(!err){
      console.log('Query successfull.');
      callback(200, project);
    }else{
      console.log('Error while performing the Query.', err);
      callback(404, err);
    }
  });
}

function removeProject(id, callback){
  connection.query("DELETE FROM projekt WHERE clientId='" + id + "'", function(err, results){
    if(!err){
      console.log('Query successfull.');
      callback(200, results);
    }else{
      console.log('Error while performing the Query.', err);
      callback(404, err);
    }
  });
}

function updateProject(id, active, callback){
  connection.query("UPDATE projekt SET active = '"+ active +"' WHERE clientId ='" + id +"'", function(err, results) {
    if(!err){
      console.log('Query successfull.');
      callback(200, results);
    }else{
      console.log('Error while performing the Query.', err);
      callback(404, err);
    }
  });
}

function getAllProject(callback){
  connection.query("SELECT * FROM projekt", function(err, results) {
    if(!err){
      console.log('Query successfull.');
      callback(200, results);
    }else{
      console.log('ERROR while.', err);
      callback(404, err);
    }
  });
}

function getIssuesOfProject(id, callback){
  connection.query("SELECT * FROM issue WHERE projektID ='" + id + "'", function(err, results){
    if(!err){
      console.log('Query successfull.');
      callback(200,results);
    }else{
      console.log('Error while performing the Query.', err);
      callback(404, err);
    }
  });
}

module.exports = {
    //close: closeDB,
    open: openDB,
    insertProject: insertProject,
    updateProject: updateProject,
    removeProject: removeProject,
    //insertIssue: insertIssue,
    //updateIssue: updateIssue,
    //removeIssue: removeIssue,
    getAllProject: getAllProject,
    getIssues: getIssuesOfProject
}
