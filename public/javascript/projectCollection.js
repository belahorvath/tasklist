class ProjectCollection {

    constructor(tag) {
        this.collection = [];
        if(tag) {
            this.riotjs_tag = tag;
        }
        localStorage.setItem("index",-1);

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
