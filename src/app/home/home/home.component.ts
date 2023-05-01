import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ViewEncapsulation } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  customOptions       :OwlOptions = {
    loop: true, mouseDrag: true, touchDrag: true, pullDrag: false, dots: false,
    navSpeed: 700, autoplay: false, autoplayHoverPause: true, autoplayTimeout:5000, margin:30,
    navText: ['<div class="custom-icon-left"></div>', '<div class="custom-icon-right"></div>'],
    responsive: {
      0: { items: 1 }, 250: { items: 2 }, 500: { items: 3 }, 750: { items: 4 }, 1000: { items: 5 } }, nav: true
  }

  customOptions1      :OwlOptions = {
    loop: false, mouseDrag: true, touchDrag: true, pullDrag: false, dots: false,
    navSpeed: 700, autoplay: false, autoplayHoverPause: true, autoplayTimeout:5000, margin:20,
    autoWidth:true,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: { 0: { items: 1 }, 400: { items: 2 }, 740: { items: 3 }, 940: { items: 4 } }, nav: true
  }

  categoryDatas       :any = [];
  freshArrivals: any[];
  freshArrivalsCategoryObj: any;
  freshArrivalsCategoryList: any[];
  freshArrivalCategoryObj: any;
  itemPrice: any[];
   iPrice : Number = 0;
  // category

  constructor(public data   :SharedDataService,
              public route  :ActivatedRoute,
              public router :Router,
              public api    :HttpService) { }

  ngOnInit(): void {

    this.api.post('FETCH_CATEGORY_DETAILS',{}).subscribe(res => { //Get Category details
      this.categoryDatas = res.response;
    });

    this.api.get('FETCH_FRESH_ARRIVALS').subscribe(res => { //Get Category details
      this.freshArrivals = res.response;
      /*console.log("hello");
      for(let key1 in this.freshArrivals) {
           this.iPrice = this.freshArrivals[key1].price;
            console.log("key1 -->"+ this.freshArrivals[key1].price+" ---"+this.freshArrivals[key1].discount);
           // this.freshArrivals[key1].price =  this.freshArrivals[key1].price - ((this.freshArrivals[key1].discount*this.freshArrivals[key1].price)/100.0)
           // this.freshArrivals[key1].price =  this.freshArrivals[key1].price - ((this.freshArrivals[key1].discount*this.freshArrivals[key1].price)/100.0)

      }*/

      this.freshArrivalsCategoryObj={}
      this.freshArrivalCategoryObj={}
      // this.freshArrivalsCategoryList = []
      for(let key in this.freshArrivals){
        this.freshArrivalsCategoryObj[this.freshArrivals[key].categoryId]  = this.freshArrivals[key].category
        if(this.freshArrivalCategoryObj[this.freshArrivals[key].categoryId]){
          this.freshArrivalCategoryObj[this.freshArrivals[key].categoryId].push(this.freshArrivals[key])
        }else{
          this.freshArrivalCategoryObj[this.freshArrivals[key].categoryId] = [this.freshArrivals[key]]
        }
      }
      this.freshArrivalsCategoryList = Object.keys(this.freshArrivalsCategoryObj);

       console.log(this.freshArrivalCategoryObj, this.freshArrivalCategoryObj,this.freshArrivalsCategoryObj )
    });

  }



  categoryOnChange(event: any) {
    console.log(event.target.value)
    this.freshArrivals = this.freshArrivalCategoryObj[event.target.value]
  }


}
