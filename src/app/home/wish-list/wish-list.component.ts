import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { HttpService } from 'src/app/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { paytm } from 'src/constants';
import { MatCheckboxChange } from '@angular/material/checkbox';
declare var $: any;

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(public data:SharedDataService,
              private api:HttpService,
              public router     :Router,
              private route:ActivatedRoute,
              ) { }
  ngOnInit(): void {
    
    if (!this.data.loginFlag) {
      this.router.navigate(['/']);
      return;
    }
    this.data.loadingClass = 'loadBG d-block';
    this.data.checkWishListData() //cart
      // this.cartDetails = this.data.cartData;
      this.data.loadingClass = 'loadBG d-none';
   // this.data.removeItemFromWishlist(pId:any);

    //}

  }



}
