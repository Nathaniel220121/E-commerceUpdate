import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpService } from 'src/app/http/http.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  prodId                :string = '';
  resCode               :number;
  customOptions       :OwlOptions = {
    loop: true, mouseDrag: true, touchDrag: true, pullDrag: false, dots: false,
    navSpeed: 700, autoplay: false, autoplayHoverPause: true, autoplayTimeout:5000, margin:30,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: { 0: { items: 1 }, 250: { items: 2 }, 500: { items: 3 }, 750: { items: 4 } }, nav: true
  }

  customOptions1      :OwlOptions = {
    loop: false, mouseDrag: true, touchDrag: true, pullDrag: false, dots: false,
    navSpeed: 700, autoplay: false, autoplayHoverPause: true, autoplayTimeout:5000, margin:20,
    autoWidth:true,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: { 0: { items: 1 }, 400: { items: 2 }, 740: { items: 3 }, 940: { items: 4 } }, nav: true
  }

  categoryDatas       :any = [];

  constructor(public data   :SharedDataService,
    public route  :ActivatedRoute,
    public router :Router,
    public api    :HttpService) { }


ngOnInit(): void {


  const routeParams = this.route.snapshot.paramMap;
  this.prodId = String(routeParams.get('cId'));

  this.api.post('FETCH_PRODUCT_LIST_CATEGORY',{categoryId:this.prodId}).subscribe(res => { //Get Category details
    this.categoryDatas = res.response;
    this.categoryDatas.push(res.response);
    this.resCode = res.responseCode;
  });

 //console.log("data -->"+this.categoryDatas);

}
}



