class ProjectCollection {

    constructor(tag) {
        this.collection = [];
        if(tag) {
            this.riotjs_tag = tag;
        }
    }

    save(){
      //localStorage.setItem("projectList", JSON.stringify(this.collection));
      console.log(this.collection);
      $.ajax({
          type: "POST",
          url: '/projects',
          data: JSON.stringify(this.collection),
          dataType: 'json'
          });
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
      //this.collection = JSON.parse(localStorage.getItem("projectList")) || [];
      $.ajax({
          type: "GET",
          url: '/projects'
          }).done(function(data){
          console.log(data);
          this.collection = data;
          console.log(this.collecion);
          });
    }

}
