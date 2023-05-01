import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  catId           :string = '';
  productList     :any = [];

  constructor(public data   :SharedDataService,
    public route  :ActivatedRoute,
    public router :Router) { } 

  ngOnInit(): void {
    if (this.data.searchProductList.length !=0) {
      this.productList = this.data.searchProductList;
    } else {
      this.router.navigate(['/']);
    }
  }

}
