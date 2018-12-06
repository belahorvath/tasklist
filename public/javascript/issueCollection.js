class IssueCollection {

    constructor(tag) {
        this.collection = [];
        if(tag) {
            this.riotjs_tag = tag;
        }
    }

    save(){
      localStorage.setItem("issueCollection", JSON.stringify(this.collection));
    }

    all() {
        return this.collection;
    }

    allIndex(index){
        var col = [];
    for(var i = 0; i<this.collection.length;i++){

        if(this.collection[i].project_id == index)
        {
            col.push(this.collection[i]);
        }

    }
        return col;
    }

    add(model) {
        this.collection.push(model);
        this.save();
        this.riotjs_tag.update();
    }

    fetch(){
      this.collection = JSON.parse(localStorage.getItem("issueCollection")) || [];
          /*
          $.ajax({
            type: "GET",
            url: 'http://zhaw-issue-tracker-api.herokuapp.com/api/projects/'+ data +'/issues',
            dataType: 'json'
              }).done(function(data){
                this.collection = data;
              });
              */
    }


    update(){
        this.riotjs_tag.update();

    }
}
