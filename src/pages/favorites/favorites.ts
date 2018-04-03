import { Component ,OnInit,Inject} from '@angular/core';
import { IonicPage, NavController, NavParams ,ItemSliding ,ToastController ,AlertController ,LoadingController } from 'ionic-angular';
import {Dish} from '../../shared/dish';
import {FavoriteProvider} from '../../providers/favorite/favorite';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit{
  favorites: Dish[];
  errMsg: string;
  constructor(public navCtrl: NavController, public navParams: NavParams
     , private favoriteservice: FavoriteProvider,@Inject('BaseURL') private BaseURL ,
      private toastCtrl : ToastController, private alertCtrl: AlertController , private loadingCtrl:LoadingController)  {
  }
 ngOnInit(){
   this.favoriteservice.getFavorites()
   .subscribe(favorites=> this.favorites=favorites , errmsg => this.errMsg= <any>errmsg);
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
 
  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete Dish '+ id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Deleting . . .'
            });
            let toast = this.toastCtrl.create({
              message: 'Dish ' + id + ' deleted successfully', 
              duration: 3000});
            loading.present();
            this.favoriteservice.deleteFavorite(id)
              .subscribe(favorites => {this.favorites = favorites; loading.dismiss(); toast.present(); } ,
                errmess =>{ this.errMsg =<any> errmess; loading.dismiss(); });
          }
        }
      ]
    });
  
    alert.present();

      item.close();

}
}