import { Component ,Inject ,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeaderProvider} from '../../providers/leader/leader';
import { Leader }from '../../shared/leader';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  leaders: Leader[];
  errMsg: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  @Inject('BaseURL') private BaseURL ,private LeaderService:LeaderProvider ) {
  }

  ngOnInit(){
   this.LeaderService.getLeaders().subscribe(leaders=>this.leaders=leaders,errmsg=>this.errMsg=<any>errmsg);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
