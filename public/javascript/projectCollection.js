class ProjectCollection {

    constructor(tag) {
        this.collection = [];
        if(tag) {
            this.riotjs_tag = tag;
        }
        /* Use this to update the issueList when refreshing the page.
        if(localStorage.getItem("index") == -1)
        {
            localStorage.setItem("index", -1);
        }
        else
        {
            localStorage.setItem("index",localStorage.getItem("index"));
            this.riotjs_tag.update();
        }
        */

    }

    save(){
      localStorage.setItem("projectList", JSON.stringify(this.collection));
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
      this.collection = JSON.parse(localStorage.getItem("projectList")) || [];
    }


}
