import { Component } from '@angular/core';
import { SharedDataService } from './shared/shared-data.service';
import { Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  storedUserData:any=[];
  metaDataDetails:any =[];
  title = 'mafic';
  constructor(public data:SharedDataService,private meta: Meta,private http:HttpClient) { }
  ngOnInit(): void {
    if(localStorage.loggedUserDataCommunity == undefined || localStorage.loggedUserDataCommunity == '' || localStorage.loggedUserDataCommunity == '{}'){
     console.log('dummy');
    } else{
      this.storedUserData = JSON.parse(localStorage.loggedUserDataCommunity);
      this.data.loggedUser(this.storedUserData);
    }
    /*
    this.http.post(''+this.data.apiDomainPathDash+'getMetaData',{}) // Get Footer letter details
    .subscribe(data => {
      console.log(data);

      this.metaDataDetails = data;
      this.metaDataDetails = this.metaDataDetails.response[0];
      this.meta.addTags([
        { name: 'description', content: this.metaDataDetails.description },
        { name: 'keywords', content: this.metaDataDetails.keywords }
      ]);
      // this.pText1.reset(this.metaDataDetails.description);
      // this.pText2.reset(this.metaDataDetails.keywords);
    },
    err => {
      // Swal.fire(err);
    })
    */
  }

}
