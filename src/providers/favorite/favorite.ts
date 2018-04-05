import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Dish} from '../../shared/dish';
import {DishProvider} from '../dish/dish';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {Storage}from '@ionic/storage';
/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http , private dishservice: DishProvider
  ,private localNotifications:LocalNotifications, private storage:Storage) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
  }

  addFavorite(id: number): boolean {
    this.favorites.push(id);
    this.storage.set('favorites',this.favorites).then(()=>console.log('favorites '+this.favorites));
    this.localNotifications.schedule({
      id: id,
      text:'Dish '+id+' added as a favorite successfully'
    });
    return true;
  }

  isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }
  getFavorites(): Observable<Dish[]>{
    this.storage.get('favorites').then(favorites => this.favorites=favorites);
    return this.dishservice.getDishes()
    .map(dishes => dishes.filter(dish => this.favorites.some(el => el ===dish.id)));
  }
  deleteFavorite(id: number):Observable<Dish[]>{
    let index = this.favorites.indexOf(id);
    if(index >= 0){
      this.storage.get('favorites').then(favorites => this.favorites=favorites);      
      this.favorites.splice(index,1);
      this.storage.set('favorites',this.favorites);
      return this.getFavorites();
    }else
    {
      return Observable.throw("deleting non-existing favorite"+id);
    }
  }
}