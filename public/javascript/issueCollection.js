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

                //Remove Strange Date format!
                for(var i = 0;i<data.length;i++){
                  var date = data[i].due_date.split('T')[0];
                  data[i].due_date = date;
                }

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
