import { Component ,OnInit ,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DishdetailPage} from '../dishdetail/dishdetail';
import { DishProvider } from '../../providers/dish/dish';
import { Dish } from '../../shared/dish';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage  implements OnInit{
  
  dishes: Dish[];
  errMess: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL ,private dishservice: DishProvider) {
  }
  ngOnInit(){
      this.dishservice.getDishes()
      .subscribe(dishes => this.dishes =dishes, errmess => this.errMess=<any> errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  dishSelected(event ,dish){
    this.navCtrl.push(DishdetailPage, {
      dish:dish
    });
  }

}
