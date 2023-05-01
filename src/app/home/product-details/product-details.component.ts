import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  prodId                :string = '';
  productDetails        :any = [];
  imageDetails          :any = [];
  public counter        : number;
  customOptions       :OwlOptions = {
    loop: true, mouseDrag: true, touchDrag: true, pullDrag: false, dots: false,
    navSpeed: 700, autoplay: false, autoplayHoverPause: true, autoplayTimeout:5000, margin:30,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: { 0: { items: 1 }, 250: { items: 2 }, 500: { items: 3 }, 750: { items: 4 } }, nav: true
  }

  constructor(public data   :SharedDataService,
    public route  :ActivatedRoute,
    public router :Router,
    public api    :HttpService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.prodId = String(routeParams.get('pId'));
    this.data.checkCartData() //cart

    this.api.post('FETCH_SINGLE_PRODUCT_DETAILS',{productId:this.prodId}).subscribe(res => { //Get Category details
      this.productDetails = res.response.productData[0];
     this.imageDetails = JSON.parse(JSON.stringify(res.response.productImages));
      console.log("image response--"+this.imageDetails);
      this.counter = this.imageDetails.length;
      console.log("image counter--"+this.counter);

      for(let key1 in this.imageDetails) {
        console.log("key1 -->"+ this.imageDetails[key1].images);
      }
      console.log("image 1 path --"+this.imageDetails[0].images);
      console.log("image 2 path --"+this.imageDetails[1].images);

    }


    );




   /* for(let i1 =0;i1<this.imageDetails.length;i1++) {
      console.log("image name--"+this.imageDetails[i1]);
    }*/
  }
 function(){}

}




