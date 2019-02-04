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

    fetch(){
      var main = this;
      $.ajax({
          type: "GET",
          url: '/api/projects',
          contentType: 'application/json',
          dataType: 'json',
          error : function(error){console.log(error); alert(error.responseText);},
          success: function(data,status){
              console.log(status, data);
              main.collection = data;
              main.riotjs_tag.update();
          }
        });
      //this.collection = JSON.parse(localStorage.getItem("projectList")) || [];
    }

    updateActive(data, active){
      var main = this;

      $.ajax({
        type: 'PUT',
        url: '/api/projects/'+ data + "/" + active,
        contentType: 'application/json',
        dataType: 'json',
        error : function(error){console.log(error); alert(error.responseText);},
        success: function(data,status){
          console.log("finished update");
        }
      });
    }

}
