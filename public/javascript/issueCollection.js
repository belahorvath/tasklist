class IssueCollection {

    constructor(tag) {
        this.collection = [];
        if(tag) {
            this.riotjs_tag = tag;
        }
    }

    save(){
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
        //this.save();
        this.riotjs_tag.update();
    }

    fetch(data){
      var main = this;
          $.ajax({
            type: "GET",
            url: 'http://zhaw-issue-tracker-api.herokuapp.com/api/projects/'+ data +'/issues',
            dataType: 'json'
              }).done(function(data){
                main.collection = data;
                main.riotjs_tag.update();
              });

    }


    update(){
        this.riotjs_tag.update();

    }
}
