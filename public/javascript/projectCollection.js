class ProjectCollection {

    constructor(tag) {
        this.collection = [];
        if(tag) {
            this.riotjs_tag = tag;
        }
    }

    save(){
      console.log(this);
      //localStorage.setItem("projectList", JSON.stringify(this.collection));

    }

    all() {
        return this.collection;
    }

    add(model) {
        this.collection.push(model);
        this.save();
        this.riotjs_tag.update();
    }

    remove(model){
      var index = this.collection.indexOf(model);
      this.collection.splice(index, 1);
    }

    fetch(callback){
      var main = this;
      $.ajax({
          type: "GET",
          url: '/api/projects',
          contentType: 'application/json',
          dataType: 'json',
          error : function(error){console.log(error); callback(404, err)},
          success: function(data,status){
              console.log(status, data);
              main.collection = data;
              main.riotjs_tag.update();
              callback(200, main);
          }
        });
      //this.collection = JSON.parse(localStorage.getItem("projectList")) || [];
    }

    createProject(tempProject, callback){
      var main = this;

      $.ajax({
          type: "POST",
          url: '/api/projects',
          data: JSON.stringify(tempProject),
          contentType: 'application/json',
          dataType: 'json',
          error : function(error){console.log(error); callback(404, err);},
          success: function(data,status){
              console.log(status);
              callback(200, tempProject);
          }
        });
    }

    updateActive(data, active){
      var main = this;

      $.ajax({
        type: 'PUT',
        url: '/api/projects/'+ data + "/" + active,
        contentType: 'application/json',
        dataType: 'json',
        error :  function(error){console.log(error); alert(error.responseText);},
        success: function(data,status){
          console.log("finished update");
        }
      });
    }

    removeProjectInDB(data, callback){
      var main = this;

      $.ajax({
        type: 'DELETE',
        url: '/api/projects/',
        data: JSON.stringify(data),
        contentType: 'application/json',
        error :  function(error){console.log(error); callback(404, err);},
        success: function(data,status){
          console.log("Porjekt: " + data + " got deleted!");
          callback(200);
          main.riotjs_tag.update();
        }
      });
    }

}
