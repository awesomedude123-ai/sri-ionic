import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { Items } from '../../providers';
import { Item } from '../../models/item';


@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  public items:Items;
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public modalCtrl: ModalController) {
    this.item = navParams.get('item') || items.defaultItem;
  }
  
  deleteItem(item: Item){
    this.items.delete(item);


  }

  updateItem(item: Item){
    this.items.update(item);
    this.navCtrl.pop;
  }
  
  updateItems() {
    let addModal = this.modalCtrl.create('ItemUpdatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.update(item);
      }
    })
    addModal.present();
  }


}
