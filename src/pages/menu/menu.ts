import { Component ,OnInit ,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DishdetailPage} from '../dishdetail/dishdetail';
import { DishProvider } from '../../providers/dish/dish';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';

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
    @Inject('BaseURL') private BaseURL ,private dishservice: DishProvider, private favoriteservice: FavoriteProvider) {
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
  addToFavorites(dish: Dish) {
    console.log('Adding to Favorites', dish.id);
    this.favoriteservice.addFavorite(dish.id);
  }

}
