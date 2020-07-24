import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { Api } from '../../providers/api/api';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor(public api: Api) {
    let items = []
    let seq = api.get("nflplayers/getAllNflPlayers",null).share();
    seq.subscribe((res: any) => {
      console.log(res)
      items = res.nflPlayersList
      for(let item of items){
        this.items.push(new Item(item));
      }
     }, err=>{
        console.error('ERROR',err)
      });

    }// end constructor
  
  

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    let seq= this.api.post("nflplayers/addNflPlayer",item).share();
    seq.subscribe((res:any) => {
      console.log(res)

    }, err => {
      console.error('ERROR',err);
    })

  }//end add method

  delete(item: Item) {
    let seq = this.api.delete("nflplayers/deleteNflPlayer");
}

  update(item: Item){
    let seq = this.api.post("nflplayers/updateNflPlayer",item);
    item.merge(seq);

  }// end update method


}

