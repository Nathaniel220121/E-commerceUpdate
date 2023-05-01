import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  catId           :string = '';
  productList     :any = [];

  constructor(public data   :SharedDataService,
              public route  :ActivatedRoute,
              public router :Router,
              public api    :HttpService) { } 

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.catId = String(routeParams.get('cId'));

    this.api.post('FETCH_PRODUCT_LIST_CATEGORY',{categoryId:this.catId}).subscribe(res => { //Get Category details
      this.productList = res.response;
    });
  }

}
