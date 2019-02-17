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



//<------------------------------------------------------------------------ PROJECTS --------------------------------------------------------------------------->

function insertProject(project, callback){
  connection.query("INSERT INTO projekt (title, active, clientId) VALUES ('" + project.title + "'," + 0 + ",'" + uuidv4() + "')", function(err, results){
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



//<------------------------------------------------------------------------ ISSUES --------------------------------------------------------------------------->

function insertIssue(issue, callback){
  console.log(issue);
  connection.query("INSERT INTO issue (projektId, clientId, done, title, due_date, created_at, updated_at, priority) VALUES ('"+ issue.project_id + "','"
  + uuidv4() + "','" + issue.done + "','" + issue.title + "','" + issue.due_date + "','" + issue.created_at + "','" + issue.updated_at + "','" + issue.priority + "')" , function(err, results){
    if(!err){
      console.log('Query successfull.');
      callback(200, issue);
    }else{
      console.log('Error while performing the Query.', err);
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



//<------------------------------------------------------------------------ UUID AND EXPORTS --------------------------------------------------------------------------->

// generate uuidv4
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = {
    //close: closeDB,
    open: openDB,
    insertProject: insertProject,
    updateProject: updateProject,
    removeProject: removeProject,
    insertIssue: insertIssue,
    //updateIssue: updateIssue,
    //removeIssue: removeIssue,
    getAllProject: getAllProject,
    getIssues: getIssuesOfProject
}
