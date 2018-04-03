import { Component  ,Inject} from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController , ActionSheetController , ModalController} from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import {CommentPage} from '../../pages/comment/comment';
import {Storage} from '@ionic/storage';
import {favorites} from '../../shared/favorites';
/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  favorite: boolean;
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
 
  constructor(public navCtrl: NavController, public navParams: NavParams ,
  @Inject('BaseURL') private BaseURL, private toastCtrl:ToastController ,
  private favoriteservice: FavoriteProvider ,private actionSheetCtrl:ActionSheetController ,private modalCtrl:ModalController,
  private storage:Storage) {
    this.dish=navParams.get('dish');
    this.favorite=favoriteservice.isFavorite(this.dish.id);
    this.numcomments=this.dish.comments.length;
    let total =0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgstars = (total/this.numcomments).toFixed(2);

  }
  addToFavorites() {
    
   this.favorite = this.favoriteservice.addFavorite(this.dish.id);
   
  //  this.storage.get('favorites').then(favorites=> {
  //  if(favorites)
  //  {this.favoritesIds=favorites;
  //   this.favoritesIds.push(this.dish.id);
  //   this.storage.set('favorites',this.favoritesIds);
  // }
  //  else {
  //    this.favoritesIds.push(this.dish.id);
  //    this.storage.set('favorites',this.favoritesIds);
  //  }
    // }
    // );
    
     this.storage.get('favoritesId').then((favoritesId)=>{  
     let Favorites ={
       dishId:[]

     }
       
       if(favoritesId != null)
      { 
       Favorites.dishId.concat(favoritesId);
       Favorites.dishId.push(this.dish.id);
       this.storage.set('favoritesId',Favorites);

      }else{
        Favorites.dishId.push(this.dish.id);
        this.storage.set('favoritesId',Favorites);
      }
    }
  
  );
      
   this.toastCtrl.create({
    message: 'Dish ' + this.dish.id + ' added as favorite successfully',
    position: 'middle',
    duration: 3000}).present();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
  
  showOption(){
    let actionSheet=this.actionSheetCtrl.create(
      {
        title:'options',
        buttons:[
          {
            text:'Add to Favorites',
            handler:()=>{
              console.log('add to favorites');
              this.addToFavorites();
            }
          },
          {
            text:'Add a Comment',
            handler:()=>{
              console.log('add to comment');
              let modal= this.modalCtrl.create(CommentPage);
              modal.present();
              modal.onDidDismiss(comment => this.dish.comments.push(comment));
            }
          },
          {
            text:'Cancel',
            role:'cancel',
          }
        ]
      }
    ).present();
    
    }

  
}
