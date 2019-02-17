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
            type: "GET",
            url: '/api/projects/'+ data +'/issues',
            contentType: 'application/json',
            dataType: 'json',
            error : function(error){console.log(error); alert(error.responseText);},
            success: function(data,status){
                console.log(status, data);
                main.collection = data;
                main.riotjs_tag.update();
            }
    });
  }

  createIssue(tempIssue, callback){
    var main = this;

    $.ajax({
        type: "POST",
        url: '/api/issues/',
        data: JSON.stringify(tempIssue),
        contentType: 'application/json',
        dataType: 'json',
        error : function(error){console.log(error); callback(404, error);},
        success: function(data,status){
            console.log(status);
            callback(200, tempIssue);
        }
      });
  }

    update(){
        this.riotjs_tag.update();
    }
}
