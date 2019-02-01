class IssueCollection {

    constructor(tag) {
        this.collection = [];
        if(tag) {
            this.riotjs_tag = tag;
        }
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
        this.riotjs_tag.update();
    }

    fetch(data){
      var main = this;
          $.ajax({
            async: false,
            type: "GET",
            url: '/api/projects/'+ data +'/issues',
            dataType: 'json'
              }).done(function(data){
                main.collection = data;
                /*
                //Convert date back from ISO format to normal
                for(i = 0;i<main.collection.length;i++){
                  var date = new Date(main.collection[i].due_date);
                  main.collection[i].due_date = date.toISOString().substring(0, 10);
                }
                */
                main.riotjs_tag.update();
              });
    }

    update(){
        this.riotjs_tag.update();
    }
}
