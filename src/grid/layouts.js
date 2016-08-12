class Layout{

  constructor(config){
    this.ml = config.ml;
    this.mt = config.mt;
    this.w = config.w;
    this.h = config.h;
    this.grid = config.grid;
    this.ids = config.ids;
    this.hor = config.hor;
    this.rows = config.rows;
    this.cols = config.cols;
    this.pt = config.pt;
    this.pl = config.pl;

  }
  update(){
    //return;
    if(!this.grid)return;
    this.grid.rows = this.rows;
    this.grid.cols = this.cols;
    const rows = this.rows;
    const cols = this.cols;
    const activeCols = cols-this.ml;
    const activeRows = rows-this.mt;
    const elementsInCols = Math.floor(activeCols/this.w);
    const elementsInRows = Math.floor(activeRows/this.h);
    const layout = [];
    let ids = null;
    let done = false;
    if(!this.ids){
      ids = this.grid.ids;
    }
    if(this.hor){
      //TODO: for horizontal fill
    }else{
      for(let t = 0;!done;t++){
        for(let l = 0;l<elementsInCols;l++){
          let left = this.pl+this.ml+(this.w+this.ml)*l;
          let top = this.pt+this.mt+(this.h+this.mt)*t;
          let id = ids.next().value;
          if(id===undefined){
            done = true;
            break;
          }
          layout.push([id,left,top,this.w,this.h]);
        }
      }

    }

    const transform = {
      layout:layout
    };
    console.log(layout);
    this.grid.transform(transform);

  }
}

module.exports = {Layout}
