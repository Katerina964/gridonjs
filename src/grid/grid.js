const GridElement = require("./gridelement.js").GridElement;
const PercentStyleController = require("../utils/styleControllers.js").PercentStyleController;


const GRID_LAYOUT = Symbol("GRID_LAYOUT");
const ELEM_MAP = Symbol("ELEM_MAP");
const DOM_ELEMENT = Symbol("DOM_ELEMENT");
//const PSC = Symbol("PSC");
const STATIC_GRIDS_MAP = Symbol("STATIC_GRIDS_MAP");
const TRANSFORMS_LIST = Symbol("TRANSFORMS_LIST");


class Grid{

  static get gridsMap(){
    if(Grid[STATIC_GRIDS_MAP]===undefined){
      Grid[STATIC_GRIDS_MAP] = new Map();
    }
    return Grid[STATIC_GRIDS_MAP];
  }

  constructor(domElement,cols=10,rows=10){
    this[GRID_LAYOUT]={rows:rows,cols:cols};
    this[ELEM_MAP]=new Map();
    this[TRANSFORMS_LIST] = new Map();
    this[DOM_ELEMENT]=domElement;
    this[Symbol.iterator]=this[ELEM_MAP][Symbol.iterator];
    Grid.gridsMap.set(domElement.id,this);
  }

  forEach(callback){
    this[ELEM_MAP].forEach(callback);
  }

  get ids(){
    return this[ELEM_MAP].keys();
  }
  
  get transormsList(){
    return this[TRANSFORMS_LIST];
  }

  get domElement(){
    return this[DOM_ELEMENT];
  }

  get id(){
    return this[DOM_ELEMENT].id;
  }

  set cols(cols){
    this[GRID_LAYOUT].cols = cols;
  }

  get cols(){
    return this[GRID_LAYOUT].cols;
  }

  set rows(rows){
    this[GRID_LAYOUT].rows = rows;
  }

  get rows(){
    return this[GRID_LAYOUT].rows;
  }

  set(id,element){
    element.layout=this[GRID_LAYOUT];
    this[ELEM_MAP].set(id,element);
  }

  get(id){
    return this[ELEM_MAP].get(id);
  }
  has(id){
    return this.get(id)!==undefined;
  }

  getIdOfDomElement(domElement){
    const elementsMap = this[ELEM_MAP];
    for(const kv of elementsMap){
      if(kv[1].domElement===domElement){
        return kv[0];
      }
    }
    return undefined;
  }

  delete(id){
    element = this.get(id);
    if(element!==undefined){
      element.layout=undefined;
      this[ELEM_MAP].delete(id);
    }
    return element;
  }

  toString(){
    let str =
    `id:${this.id}\nrows:${this.rows}\ncols:${this.cols}\nelements:\n{`;
    const elementsMap = this[ELEM_MAP];
    for(const element of elementsMap){
      str+=`\nid:${element[0]} => ${element[1].toString()}`;
    }
    str+="\n}";
    return str;
  }

  transformOneByParamList(params){
    const elem = this.get(params[0]);
    if(elem!==undefined){
      elem.transform(params[1],params[2],params[3],params[4]);
    }
  }

  transformManyByParamLists(list){
    for(const params of list){
      this.transformOneByParamList(params);
    }
  }
  //universal transform method
  transform(object){
    if(object.rows!==undefined){
      this.rows = object.rows;
    }
    if(object.cols!==undefined){
      this.cols = object.cols;
    }
    if(object.layout!==undefined){
      this.transformManyByParamLists(object.layout);
    }
  }

  applyTransfromsByConditions(){
    const transforms = this.transormsList;
    for(const transform of transforms){
      if(transform.condition!==undefined&&transform.condition()){
        this.transform(transform);
      }
    }
  }

  recalulatePixels(){
    const elementsMap = this[ELEM_MAP];
    for(const kv of elementsMap){
      kv[1].recalulatePixelsAsGridElement();
    }
  }

}

module.exports = {Grid};
